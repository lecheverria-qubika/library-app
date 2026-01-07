import { UserRepository } from '../repositories/userRepository';
import { comparePassword, hashPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { UserRole } from '../models/types';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(username: string, password: string): Promise<{
    statusCode: number; token: string | null; user: { id: number; username: string; role: UserRole } | null; error: string | null;
  }> {
    
    const user = await this.userRepository.findByUsername(username);
    
    if (!user) {
      return {
        statusCode: 404,
        token: null,
        user: null,
        error: 'User not found'
      };
    }

    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return {
        statusCode: 403,
        token: null,
        user: null,
        error: 'Invalid password for user'
      };
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role
    });

    return {
      statusCode: 200,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      error: null
    };
  }

  async register(username: string, password: string, role: UserRole = UserRole.REGULAR): Promise<{
    statusCode: number; id: number | null; username: string | null; role: UserRole | null, error: string | null;
  }> {
   
    const existingUser = await this.userRepository.findByUsername(username);
    
    if (existingUser) {
      return {
        statusCode: 400,
        id: null,
        username: null,
        role: null,
        error: 'User already exists'
      };
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userRepository.create(username, hashedPassword, role);

    return {
      statusCode: 201,
      id: user.id,
      username: user.username,
      role: user.role,
      error: null
    };
  }
}


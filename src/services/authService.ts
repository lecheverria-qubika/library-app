import { UserRepository } from '../repositories/userRepository';
import { comparePassword, hashPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { UserRole } from '../models/types';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(username: string, password: string): Promise<{ token: string; user: { id: number; username: string; role: UserRole } }> {
    const user = await this.userRepository.findByUsername(username);
    
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      throw new Error('Invalid username or password');
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  }

  async register(username: string, password: string, role: UserRole = UserRole.REGULAR): Promise<{ id: number; username: string; role: UserRole }> {
    const existingUser = await this.userRepository.findByUsername(username);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userRepository.create(username, hashedPassword, role);

    return {
      id: user.id,
      username: user.username,
      role: user.role
    };
  }
}


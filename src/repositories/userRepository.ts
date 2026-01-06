import pool from '../config/database';
import { User, UserRole } from '../models/types';

export class UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT id, username, password, role FROM users WHERE username = ?',
      [username]
    );
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT id, username, password, role FROM users WHERE id = ?',
      [id]
    );
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  async create(username: string, password: string, role: UserRole = UserRole.REGULAR): Promise<User> {
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );
    const insertResult = result as any;
    return {
      id: insertResult.insertId,
      username,
      password,
      role
    };
  }
}


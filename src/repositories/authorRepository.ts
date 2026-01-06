import pool from '../config/database';
import { Author, AuthorWithBookCount } from '../models/types';

export class AuthorRepository {
  async findAll(): Promise<Author[]> {
    const [rows] = await pool.execute(
      'SELECT id, first_name as firstName, last_name as lastName FROM authors ORDER BY first_name, last_name'
    );
    return rows as Author[];
  }

  async findById(id: number): Promise<Author | null> {
    const [rows] = await pool.execute(
      'SELECT id, first_name as firstName, last_name as lastName FROM authors WHERE id = ?',
      [id]
    );
    const authors = rows as Author[];
    return authors.length > 0 ? authors[0] : null;
  }

  async create(firstName: string, lastName: string): Promise<Author> {
    const [result] = await pool.execute(
      'INSERT INTO authors (first_name, last_name) VALUES (?, ?)',
      [firstName, lastName]
    );
    const insertResult = result as any;
    return {
      id: insertResult.insertId,
      firstName,
      lastName
    };
  }

  async findAllOrderedByBookCount(): Promise<AuthorWithBookCount[]> {
    const [rows] = await pool.execute(`
      SELECT 
        a.id,
        a.first_name as firstName,
        a.last_name as lastName,
        COUNT(l.id) as book_count
      FROM authors a
      LEFT JOIN books l ON a.id = l.author_id
      GROUP BY a.id, a.first_name, a.last_name
      ORDER BY book_count DESC, a.first_name, a.last_name
    `);
    return rows as AuthorWithBookCount[];
  }
}


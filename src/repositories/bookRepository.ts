import pool from '../config/database';
import { Book } from '../models/types';

export class BookRepository {
  async findAll(): Promise<Book[]> {
    const [rows] = await pool.execute(
      'SELECT id, title, author_id, publication_date FROM books ORDER BY publication_date DESC'
    );
    return rows as Book[];
  }

  async findById(id: number): Promise<Book | null> {
    const [rows] = await pool.execute(
      'SELECT id, title, author_id, publication_date FROM books WHERE id = ?',
      [id]
    );
    const books = rows as Book[];
    return books.length > 0 ? books[0] : null;
  }

  async findByAuthorId(authorId: number): Promise<Book[]> {
    const [rows] = await pool.execute(
      'SELECT id, title, author_id, publication_date FROM books WHERE author_id = ? ORDER BY publication_date DESC',
      [authorId]
    );
    return rows as Book[];
  }

  async findAllOrderedByPublicationDate(): Promise<Book[]> {
    const [rows] = await pool.execute(
      'SELECT id, title, author_id, publication_date FROM books ORDER BY publication_date DESC'
    );
    return rows as Book[];
  }

  async create(title: string, authorId: number, publicationDate: Date): Promise<Book> {
    const [result] = await pool.execute(
      'INSERT INTO books (title, author_id, publication_date) VALUES (?, ?, ?)',
      [title, authorId, publicationDate]
    );
    const insertResult = result as any;
    return {
      id: insertResult.insertId,
      title,
      author_id: authorId,
      publication_date: publicationDate
    };
  }
}


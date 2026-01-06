import { Request, Response } from 'express';
import { BookService } from '../../services/bookService';

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const books = await this.bookService.getAllBooks();
      res.json(books);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const book = await this.bookService.getBookById(id);

      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      res.json(book);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getBooksByAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const authorId = parseInt(req.params.authorId);
      const books = await this.bookService.getBooksByAuthor(authorId);
      res.json(books);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  getBooksOrderedByPublicationDate = async (req: Request, res: Response): Promise<void> => {
    try {
      const books = await this.bookService.getBooksOrderedByPublicationDate();
      res.json(books);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  createBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, author_id, publication_date } = req.body;

      if (!title || !author_id || !publication_date) {
        res.status(400).json({ error: 'Title, author_id and publication_date are required' });
        return;
      }

      const publicationDate = new Date(publication_date);
      if (isNaN(publicationDate.getTime())) {
        res.status(400).json({ error: 'Invalid publication date' });
        return;
      }

      const book = await this.bookService.createBook(title, author_id, publicationDate);
      res.status(201).json(book);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}


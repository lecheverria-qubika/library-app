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
      res.status(200).json(books);
    } catch (error: any) {
      res.status(500).json({ error: 'Something went wrong' });
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

      res.status(200).json(book);
    } catch (error: any) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  getBooksByAuthor = async (req: Request, res: Response): Promise<void> => {

    try {
      const authorId = parseInt(req.params.authorId);
      const { statusCode, ...result } = await this.bookService.getBooksByAuthor(authorId);
      res.status(statusCode).json(result);
    } catch (error: any) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  getBooksOrderedByPublicationDate = async (req: Request, res: Response): Promise<void> => {
    try {
      const books = await this.bookService.getBooksOrderedByPublicationDate();
      res.status(200).json(books);
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

      const { statusCode, ...result } = await this.bookService.createBook(title, author_id, publicationDate);

      res.status(statusCode).json(result);

    } catch (error: any) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
}


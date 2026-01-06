import { Request, Response } from 'express';
import { AuthorService } from '../../services/authorService';

export class AuthorController {
  private authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
  }

  getAllAuthors = async (req: Request, res: Response): Promise<void> => {

    try {
      const authors = await this.authorService.getAllAuthors();
      res.json(authors);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getAuthorById = async (req: Request, res: Response): Promise<void> => {

    try {
      const id = parseInt(req.params.id);
      const author = await this.authorService.getAuthorById(id);

      if (!author) {
        res.status(404).json({ error: 'Author not found' });
        return;
      }

      res.json(author);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  createAuthor = async (req: Request, res: Response): Promise<void> => {

    try {
      const { firstName, lastName } = req.body;

      if (!firstName || !lastName) {
        res.status(400).json({ error: 'First name and last name are required' });
        return;
      }

      const author = await this.authorService.createAuthor(firstName, lastName);
      res.status(201).json(author);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAuthorsOrderedByBookCount = async (req: Request, res: Response): Promise<void> => {
    
    try {
      const authors = await this.authorService.getAuthorsOrderedByBookCount();
      res.json(authors);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}


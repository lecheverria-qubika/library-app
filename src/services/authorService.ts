import { AuthorRepository } from '../repositories/authorRepository';
import { Author, AuthorWithBookCount } from '../models/types';

export class AuthorService {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  async getAllAuthors(): Promise<Author[]> {
    return this.authorRepository.findAll();
  }

  async getAuthorById(id: number): Promise<Author | null> {
    return this.authorRepository.findById(id);
  }

  async createAuthor(firstName: string, lastName: string): Promise<Author> {
    if (!firstName || !lastName) {
      throw new Error('First name and last name are required');
    }
    return this.authorRepository.create(firstName, lastName);
  }

  async getAuthorsOrderedByBookCount(): Promise<AuthorWithBookCount[]> {
    return this.authorRepository.findAllOrderedByBookCount();
  }
}


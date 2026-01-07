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

  async createAuthor(firstName: string, lastName: string): Promise<{statusCode: number; author: Author | null; error: string | null}> {

    const author = await this.authorRepository.create(firstName, lastName);
   
    return {
      statusCode: 201,
      author,
      error: null
    };
  }

  async getAuthorsOrderedByBookCount(): Promise<AuthorWithBookCount[]> {
    return this.authorRepository.findAllOrderedByBookCount();
  }
}


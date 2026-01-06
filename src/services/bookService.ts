import { BookRepository } from '../repositories/bookRepository';
import { AuthorRepository } from '../repositories/authorRepository';
import { Book } from '../models/types';

export class BookService {
  private bookRepository: BookRepository;
  private authorRepository: AuthorRepository;

  constructor() {
    this.bookRepository = new BookRepository();
    this.authorRepository = new AuthorRepository();
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async getBookById(id: number): Promise<Book | null> {
    return this.bookRepository.findById(id);
  }

  async getBooksByAuthor(authorId: number): Promise<Book[]> {
    const author = await this.authorRepository.findById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }
    return this.bookRepository.findByAuthorId(authorId);
  }

  async getBooksOrderedByPublicationDate(): Promise<Book[]> {
    return this.bookRepository.findAllOrderedByPublicationDate();
  }

  async createBook(title: string, authorId: number, publicationDate: Date): Promise<Book> {
    if (!title || !authorId || !publicationDate) {
      throw new Error('Title, author and publication date are required');
    }

    const author = await this.authorRepository.findById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }

    return this.bookRepository.create(title, authorId, publicationDate);
  }
}


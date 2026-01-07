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

  async getBooksByAuthor(authorId: number): Promise<{statusCode: number; books: Book[] | null; error: string | null}> {
    
    const author = await this.authorRepository.findById(authorId);
   
    if (!author) {
      return {
        statusCode: 404,
        books: null,
        error: 'Author not found'
      };
    }

    const books = await this.bookRepository.findByAuthorId(authorId);
    
    return {
      statusCode: 200,
      books,
      error: null
    };
  }

  async getBooksOrderedByPublicationDate(): Promise<Book[]> {
    return this.bookRepository.findAllOrderedByPublicationDate();
  }

  async createBook(title: string, authorId: number, publicationDate: Date): Promise<{
    statusCode: number; book: Book | null; error: string | null
  }> {

    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      return {
        statusCode: 404,
        book: null,
        error: 'Author not found'
      };
    }

    const book = await this.bookRepository.create(title, authorId, publicationDate);

    return {
      statusCode: 201,
      book,
      error: null
    };
  }
}


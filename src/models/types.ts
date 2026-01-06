export enum UserRole {
  REGULAR = 'regular',
  ADMIN = 'admin'
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Book {
  id: number;
  title: string;
  author_id: number;
  publication_date: Date;
}

export interface AuthorWithBookCount extends Author {
  book_count: number;
}


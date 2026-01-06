import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();
const bookController = new BookController();

// Public routes (require authentication)
router.get('/', authenticate, bookController.getAllBooks);
router.get('/ordered-by-date', authenticate, bookController.getBooksOrderedByPublicationDate);
router.get('/by-author/:authorId', authenticate, bookController.getBooksByAuthor);
router.get('/:id', authenticate, bookController.getBookById);

// Protected routes (require admin)
router.post('/', authenticate, authorizeAdmin, bookController.createBook);

export default router;


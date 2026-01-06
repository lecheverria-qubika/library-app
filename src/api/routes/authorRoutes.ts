import { Router } from 'express';
import { AuthorController } from '../controllers/authorController';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();
const authorController = new AuthorController();

// Public routes (require authentication)
router.get('/', authenticate, authorController.getAllAuthors);
router.get('/ordered-by-books', authenticate, authorController.getAuthorsOrderedByBookCount);
router.get('/:id', authenticate, authorController.getAuthorById);

// Protected routes (require admin)
router.post('/', authenticate, authorizeAdmin, authorController.createAuthor);

export default router;


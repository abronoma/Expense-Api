import express from 'express';
import { addExpense, getExpenses, deleteExpense, updateExpense } from '../controllers/controller.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.post('/expense', authMiddleware, addExpense);
router.get('/expenses', authMiddleware, getExpenses);
router.delete('/expense/:id', authMiddleware, deleteExpense);
router.put('/expense/:id', authMiddleware, updateExpense);

export default router;
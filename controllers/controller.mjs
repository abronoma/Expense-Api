import Expense from '../models/model.mjs';
import { validateExpense } from '../validators/validator.mjs';

// Add an expense
export const addExpense = async (req, res, next) => {
  try {
    const { error } = validateExpense(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { amount, category, date } = req.body;
    const expense = new Expense({ userId: req.user.id, amount, category, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};


// Get all expenses
export const getExpenses = async (req, res, next) => {
    try {
      const expenses = await Expense.find({ userId: req.user.id });
      res.status(200).json(expenses);
    } catch (err) {
      next(err);
    }
  };
  
  // Delete an expense
  export const deleteExpense = async (req, res, next) => {
    try {
      await Expense.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Expense deleted' });
    } catch (err) {
      next(err);
    }
  };
  
  // Update an expense
  export const updateExpense = async (req, res, next) => {
    try {
      const { error } = validateExpense(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });
  
      const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body);
      if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
  
      res.status(200).json(updatedExpense);
    } catch (err) {
      next(err);
    }
  };


  
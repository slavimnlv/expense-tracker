import express from 'express';
import Expense from '../models/Expense.js';
import asyncHandler from '../utils/asyncHandler.js';
import { protect } from '../middleware/authMiddleware.js';
import CustomError from '../utils/CustomError.js';

const router = express.Router();

router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { description, amount, date } = req.body;

    if (!description || !amount || !date) {
      throw new CustomError('All fields are required', 400);
    }

    const expense = await Expense.create({
      user: req.user.id,
      description,
      amount,
      date,
    });

    res.status(201).json(expense);
  })
);

router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { fromDate, toDate } = req.query;

    let query = { user: req.user.id };

    if (fromDate) {
      const startDate = new Date(fromDate);
      if (!isNaN(startDate)) {
        startDate.setHours(0, 0, 0, 0);
        query.date = { $gte: startDate };
      }
    }

    if (toDate) {
      const endDate = new Date(toDate);
      if (!isNaN(endDate)) {
        if (!query.date) {
          query.date = {};
        }
        endDate.setHours(23, 59, 59, 999);
        query.date.$lte = endDate;
      }
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    res.json(expenses);
  })
);

router.put(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const { description, amount, date } = req.body;

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      throw new CustomError('Expense not found', 404);
    }

    if (expense.user.toString() !== req.user.id) {
      throw new CustomError('Unauthorized', 401);
    }

    if (description) expense.description = description;
    if (amount) expense.amount = amount;
    if (date) expense.date = date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  })
);

router.delete(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      throw new CustomError('Expense not found', 404);
    }

    if (expense.user.toString() !== req.user.id) {
      throw new CustomError('Unauthorized', 401);
    }

    await expense.remove();
    res.json({ message: 'Expense removed' });
  })
);

export default router;

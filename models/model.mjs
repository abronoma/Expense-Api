import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const expenseSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});


export default model('Expense', expenseSchema);
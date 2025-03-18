import express from 'express';
import connectDB from '../Database/db.mjs';
import authRoutes from '../routes/authRoutes.mjs';
import expenseRoutes from '../routes/routes.mjs';
import errorHandler from '../errors/errors.mjs';
import 'dotenv/config';



const app = express();

connectDB();

app.use(express.json());
app.use('/api', expenseRoutes);
app.use(errorHandler);
app.use('/api/auth', authRoutes);


export default app;
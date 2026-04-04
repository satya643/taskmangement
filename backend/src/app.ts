import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Error Handling
app.use(errorMiddleware);

export default app;

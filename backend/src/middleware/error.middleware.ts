import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  // Handle common errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  if (err.code === 'P2002') {
    statusCode = 400;
    message = 'Duplicate field value';
  }

  if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Resource not found';
  }


  if (statusCode === 500) {
    console.error(err.stack);
  }
  res.status(statusCode).json({
    success: false,
    message,
  });
};


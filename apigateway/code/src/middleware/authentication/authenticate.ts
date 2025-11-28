import { Request, Response, NextFunction } from 'express';

// Simple Bearer token authentication middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader: string | undefined = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1]; // Extract the token from the header
  const expectedToken: string | undefined = 'your-secret-token'; // Replace with your actual token

  if (token === expectedToken) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

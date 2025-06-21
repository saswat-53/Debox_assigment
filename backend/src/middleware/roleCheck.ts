import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const requireMaster = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'master') {
    return res.status(403).json({ 
      message: 'Access denied. Master role required.',
      userRole: req.user?.role 
    });
  }
  next();
};

export const requireAdminOrMaster = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !['admin', 'master'].includes(req.user.role)) {
    return res.status(403).json({ 
      message: 'Access denied. Admin or Master role required.',
      userRole: req.user?.role 
    });
  }
  next();
};
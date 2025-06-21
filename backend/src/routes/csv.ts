import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadCSV } from '../controllers/csvController';
import { authenticate } from '../middleware/auth';
import { requireMaster } from '../middleware/roleCheck';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `csv-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.csv') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

router.post('/upload', authenticate, requireMaster, upload.single('csvFile'), uploadCSV);

export default router;
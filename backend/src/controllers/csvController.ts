import { Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { AuthRequest } from '../middleware/auth';
import Product from '../models/Product';
import Category from '../models/Category';
import Inventory from '../models/Inventory';

interface CSVRow {
  'Category Name': string;
  'Category Description': string;
  'Product Name': string;
  'Product Description': string;
  'Product Price': string;
  'Available Units': string;
  'Sold Units': string;
}

export const uploadCSV = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const results: CSVRow[] = [];
    const filePath = req.file.path;

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CSVRow) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    if (results.length === 0) {
      return res.status(400).json({ message: 'CSV file is empty or invalid format' });
    }

    const requiredHeaders = ['Category Name', 'Product Name', 'Product Price'];
    const firstRow = results[0];
    const missingHeaders = requiredHeaders.filter(header => !firstRow.hasOwnProperty(header));
    
    if (missingHeaders.length > 0) {
      return res.status(400).json({ 
        message: `Missing required CSV headers: ${missingHeaders.join(', ')}` 
      });
    }

    const processedData = {
      categories: 0,
      products: 0,
      inventory: 0,
      errors: [] as string[],
    };

    for (let i = 0; i < results.length; i++) {
      const row = results[i];
      const rowNumber = i + 2;

      try {
        if (!row['Category Name']?.trim() || !row['Product Name']?.trim() || !row['Product Price']?.trim()) {
          processedData.errors.push(`Row ${rowNumber}: Missing required fields`);
          continue;
        }

        let category = await Category.findOne({ name: row['Category Name'].trim() });
        if (!category) {
          category = new Category({
            name: row['Category Name'].trim(),
            description: row['Category Description']?.trim() || row['Category Name'].trim(),
          });
          await category.save();
          processedData.categories++;
        }

        let product = await Product.findOne({ name: row['Product Name'].trim() });
        if (!product) {
          const price = parseFloat(row['Product Price']);
          if (isNaN(price) || price < 0) {
            processedData.errors.push(`Row ${rowNumber}: Invalid price format`);
            continue;
          }

          const availableUnits = parseInt(row['Available Units']) || 0;
          
          product = new Product({
            name: row['Product Name'].trim(),
            description: row['Product Description']?.trim() || row['Product Name'].trim(),
            price: price,
            stock: availableUnits,
            categories: [category._id],
          });
          await product.save();
          processedData.products++;
        } else if (!product.categories.includes(category._id)) {
          product.categories.push(category._id);
          await product.save();
        }

        const available = parseInt(row['Available Units']) || 0;
        const sold = parseInt(row['Sold Units']) || 0;

        let inventory = await Inventory.findOne({ productId: product._id });
        if (!inventory) {
          inventory = new Inventory({
            productId: product._id,
            available: available,
            sold: sold,
          });
          await inventory.save();
          processedData.inventory++;
        } else {
          inventory.available = available;
          inventory.sold = sold;
          await inventory.save();
        }
      } catch (error: any) {
        processedData.errors.push(`Row ${rowNumber}: ${error.message || error}`);
      }
    }

    fs.unlinkSync(filePath);
    res.json({
      message: 'CSV processed successfully',
      data: processedData,
    });
  } catch (error) {
    console.error('CSV upload error:', error);
    if (req.file) {
      try { fs.unlinkSync(req.file.path); } catch (cleanupError) {}
    }
    res.status(500).json({ message: 'Server error processing CSV' });
  }
};
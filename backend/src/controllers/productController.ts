import { Response } from 'express';
import Product from '../models/Product';
import Inventory from '../models/Inventory';
import { AuthRequest } from '../middleware/auth';

export const getAllProducts = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate('categories', 'name description')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('categories', 'name description');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, stock, categories } = req.body;

    if (!name || !description || price === undefined || stock === undefined) {
      return res.status(400).json({ message: 'Name, description, price, and stock are required' });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this name already exists' });
    }

    const product = new Product({ name, description, price, stock, categories: categories || [] });
    await product.save();

    const inventory = new Inventory({
      productId: product._id,
      available: stock,
      sold: 0,
    });
    await inventory.save();

    const populatedProduct = await Product.findById(product._id).populate('categories', 'name description');
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error('Create product error:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error while creating product' });
    }
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, stock, categories } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, categories },
      { new: true, runValidators: true }
    ).populate('categories', 'name description');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (stock !== undefined) {
      await Inventory.findOneAndUpdate(
        { productId: product._id },
        { available: stock },
        { upsert: true }
      );
    }

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error while updating product' });
    }
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Inventory.findOneAndDelete({ productId: product._id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};
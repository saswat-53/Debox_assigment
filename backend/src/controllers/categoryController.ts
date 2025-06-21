import { Response } from 'express';
import Category from '../models/Category';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error while fetching categories' });
  }
};

export const getCategoryById = async (req: AuthRequest, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ categories: category._id }).select('name description price');
    res.json({ ...category.toObject(), products });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Server error while fetching category' });
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, products } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const category = new Category({ name, description });
    await category.save();

    if (products && products.length > 0) {
      await Product.updateMany(
        { _id: { $in: products } },
        { $addToSet: { categories: category._id } }
      );
    }

    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error while creating category' });
    }
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, products } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (products !== undefined) {
      await Product.updateMany(
        { categories: category._id },
        { $pull: { categories: category._id } }
      );
      if (products.length > 0) {
        await Product.updateMany(
          { _id: { $in: products } },
          { $addToSet: { categories: category._id } }
        );
      }
    }

    res.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error while updating category' });
    }
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Product.updateMany(
      { categories: category._id },
      { $pull: { categories: category._id } }
    );
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error while deleting category' });
  }
};
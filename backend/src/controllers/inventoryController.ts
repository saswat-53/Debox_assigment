import { Response } from 'express';
import Inventory from '../models/Inventory';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

export const getAllInventory = async (req: AuthRequest, res: Response) => {
  try {
    const inventory = await Inventory.find()
      .populate('productId', 'name description price')
      .sort({ createdAt: -1 });
    res.json(inventory);
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ message: 'Server error while fetching inventory' });
  }
};

export const getInventoryById = async (req: AuthRequest, res: Response) => {
  try {
    const inventory = await Inventory.findById(req.params.id)
      .populate('productId', 'name description price');
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.json(inventory);
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ message: 'Server error while fetching inventory' });
  }
};

export const createInventory = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, available, sold } = req.body;

    if (!productId || available === undefined || sold === undefined) {
      return res.status(400).json({ message: 'Product ID, available, and sold quantities are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingInventory = await Inventory.findOne({ productId });
    if (existingInventory) {
      return res.status(400).json({ message: 'Inventory already exists for this product' });
    }

    const inventory = new Inventory({ productId, available, sold });
    await inventory.save();

    const populatedInventory = await Inventory.findById(inventory._id)
      .populate('productId', 'name description price');
    res.status(201).json(populatedInventory);
  } catch (error) {
    console.error('Create inventory error:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error while creating inventory' });
    }
  }
};

export const updateInventory = async (req: AuthRequest, res: Response) => {
  try {
    const { available, sold } = req.body;

    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      { available, sold },
      { new: true, runValidators: true }
    ).populate('productId', 'name description price');

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.json(inventory);
  } catch (error) {
    console.error('Update inventory error:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error while updating inventory' });
    }
  }
};

export const deleteInventory = async (req: AuthRequest, res: Response) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    console.error('Delete inventory error:', error);
    res.status(500).json({ message: 'Server error while deleting inventory' });
  }
};
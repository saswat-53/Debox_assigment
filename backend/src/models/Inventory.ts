import mongoose, { Document, Schema } from 'mongoose';

export interface IInventory extends Document {
  productId: mongoose.Types.ObjectId;
  available: number;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
}

const inventorySchema = new Schema<IInventory>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
    unique: true,
  },
  available: {
    type: Number,
    required: [true, 'Available quantity is required'],
    min: [0, 'Available quantity cannot be negative'],
    default: 0,
  },
  sold: {
    type: Number,
    required: [true, 'Sold quantity is required'],
    min: [0, 'Sold quantity cannot be negative'],
    default: 0,
  },
}, {
  timestamps: true,
});


inventorySchema.index({ productId: 1 });

export default mongoose.model<IInventory>('Inventory', inventorySchema);
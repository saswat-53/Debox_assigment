import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Category name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
}, {
  timestamps: true,
});

categorySchema.index({ name: 1 });

export default mongoose.model<ICategory>('Category', categorySchema);
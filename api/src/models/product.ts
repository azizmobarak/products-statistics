import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  ProductID: number;
  ProductName: string;
  Category: string;
  Price: number;
}

const ProductSchema: Schema = new Schema({
  ProductID: { type: Number, required: true, unique: true },
  ProductName: { type: String, required: true },
  Category: { type: String, default: "uncategorized" },
  Price: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

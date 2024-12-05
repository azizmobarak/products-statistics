import mongoose, { Schema, Document } from 'mongoose';

export interface ISale extends Document {
  SaleID: number;
  ProductID: number;
  Quantity: number;
  Date: Date;
  TotalAmount: number;
}

const SaleSchema: Schema = new Schema({
  SaleID: { type: Number, required: true, unique: true },
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true, min: 1 },
  Date: {
    type: Date,
    required: true,
    validate: {
      validator: (value: string) => !isNaN(Date.parse(value)),
      message: 'Invalid date format. Expected format: YYYY-MM-DD',
    },
  },
  TotalAmount: { type: Number, required: true, min: 0 },
});

const Sale = mongoose.model<ISale>('Sale', SaleSchema);

export default Sale;

import mongoose, { Schema, models } from 'mongoose';

export interface ITransaction {
  _id?: string;
  amount: number;
  description: string;
  date: Date;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    category: {
      type: String,
      default: 'Uncategorized',
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
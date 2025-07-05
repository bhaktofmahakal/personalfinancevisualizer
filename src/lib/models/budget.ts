import mongoose, { Schema, models } from 'mongoose';

export interface IBudget {
  _id?: string;
  category: string;
  amount: number;
  month: string; // Format: YYYY-MM
  createdAt?: Date;
  updatedAt?: Date;
}

const budgetSchema = new Schema<IBudget>(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be positive'],
    },
    month: {
      type: String,
      required: [true, 'Month is required'],
      // Validate format YYYY-MM
      validate: {
        validator: function(v: string) {
          return /^\d{4}-\d{2}$/.test(v);
        },
        message: props => `${props.value} is not a valid month format. Use YYYY-MM.`
      }
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure uniqueness of category and month
budgetSchema.index({ category: 1, month: 1 }, { unique: true });

const Budget = models.Budget || mongoose.model<IBudget>('Budget', budgetSchema);

export default Budget;
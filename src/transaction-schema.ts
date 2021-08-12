import {
    Schema
  } from 'mongoose';
  import mongoose from 'mongoose';
  
  export const Transaction = new Schema({
    client: String,
    product: String,
    revenue: Number,
    productionCosts: Number,
    sellingCosts: Number,
    transportCosts: Number,
    taxes: Number,
    transactionMonth: Number,
    transactionYear: Number,
    feePerUse: {type: Number,
                default: 0
    },
  },
  {
    timestamps: true
  });

const transactions = mongoose.model("transactions", Transaction);
export default transactions;
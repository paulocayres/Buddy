import * as mongoose from 'mongoose';

export const VisitorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

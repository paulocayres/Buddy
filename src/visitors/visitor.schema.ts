import * as mongoose from 'mongoose';

export const VisitorSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true},
  telefone: String,
});

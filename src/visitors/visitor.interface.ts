import { Document } from 'mongoose';

export interface Visitor extends Document {
  readonly nome: string;
  readonly email: string;
  readonly telefone: string;
}

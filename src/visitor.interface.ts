import { Document } from 'mongoose';

export interface Visitor extends Document {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
}

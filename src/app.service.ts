import { VisitorDto } from './visitors/visitor.dto';
import { Visitor } from './visitors/visitor.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('Visitor') private readonly visitorModel: Model<Visitor>) {}

  async create(visitorDto: VisitorDto): Promise<Visitor> {
    const createdVisitor = new this.visitorModel(visitorDto);
    return await createdVisitor.save();
  }

  async findAll(): Promise<Visitor[]> {
    return await this.visitorModel.find().exec();
  }
}

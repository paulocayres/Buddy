import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitorDto } from './visitor.dto';
import { Visitor } from './visitor.interface';

@Injectable()
export class VisitorsService {

    constructor(@InjectModel('Visitor') private readonly visitorModel: Model<Visitor>) {}

    async create(visitorDto: VisitorDto): Promise<Visitor> {
      const createdVisitor = new this.visitorModel(visitorDto);
      return await createdVisitor.save();
    }

    async findAll(): Promise<Visitor[]> {
      return await this.visitorModel.find().exec();
    }
}

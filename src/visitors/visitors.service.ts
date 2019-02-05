import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitorDto } from './visitor.dto';
import { Visitor } from './visitor.interface';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectModel('Visitor') private readonly visitorModel: Model<Visitor>,
    private http: HttpService,
  ) {}

  async create(visitorDto: VisitorDto): Promise<Visitor> {
    const createdVisitor = await new this.visitorModel(visitorDto);
    return createdVisitor.save();
  }

  async findAll(): Promise<Visitor[]> {
    return await this.visitorModel.find().exec();
  }

  async captcha(token: any): Promise<any> {
    Logger.log('entro serviço');
    const body = {
      secret: process.env.captcha,
      response: token.token,
    };
    Logger.log(body);
    /*     const retrn = await this.http
      .post('https://www.google.com/recaptcha/api/siteverify', body)
      .toPromise(); */

    return await this.http
      .post('https://www.google.com/recaptcha/api/siteverify', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
  }
}

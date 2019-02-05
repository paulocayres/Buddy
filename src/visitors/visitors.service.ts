import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitorDto } from './visitor.dto';
import { Visitor } from './visitor.interface';
import { map } from 'rxjs/operators';
import { AxiosResponse } from '../../node_modules/axios';

@Injectable()
export class VisitorsService {

    body: any;

    constructor(@InjectModel('Visitor') private readonly visitorModel: Model<Visitor>, private http: HttpService) {}

    async create(visitorDto: VisitorDto): Promise<Visitor> {
      const createdVisitor = await new this.visitorModel(visitorDto);
      return createdVisitor.save();
    }

    async findAll(): Promise<Visitor[]> {
      return await this.visitorModel.find().exec();
    }

    async captcha(token: any): Promise<AxiosResponse> {
      Logger.log('entro serviço');
      this.body = { secret: process.env.captcha, response: token.token};
      Logger.log(this.body);
      const retrn = await this.http.post('https://www.google.com/recaptcha/api/siteverify', this.body).toPromise();
      Logger.log(retrn);
      return retrn;
    }
}

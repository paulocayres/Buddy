import { HttpService, Injectable, Logger, Req } from '@nestjs/common';
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

  async captcha(token: any, @Req() req): Promise<any> {
    Logger.log('entro serviço');
    req.AddHeader('content-type', 'x-www-form-urlencoded');
    req.AddParameter('secret', process.env.captcha);
    req.AddParameter('response', token.token);
/*     const body = {
      secret: process.env.captcha,
      response: token.token,
    }; */
    Logger.log(req);
    /*     const retrn = await this.http
      .post('https://www.google.com/recaptcha/api/siteverify', body)
      .toPromise(); */

    return await this.http
      .post('https://www.google.com/recaptcha/api/siteverify', req, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();
  }
}

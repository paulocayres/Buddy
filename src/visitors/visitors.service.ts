import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitorDto } from './visitor.dto';
import { Visitor } from './visitor.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectModel('Visitor') private readonly visitorModel: Model<Visitor>,
    private http: HttpService,
  ) {}

  async create(visitorDto: VisitorDto): Promise<any> {
    Logger.log('DTO' + visitorDto.recaptcha);
    if (visitorDto.recaptcha) {
      const captcha = await this.http
        .get(
          'https://www.google.com/recaptcha/api/siteverify?secret=' +
            process.env.captcha +
            '&response=' +
            visitorDto.recaptcha,
        )
        .pipe(map(response => response.data))
        .toPromise();

      Logger.log('captcha' + JSON.stringify(captcha));

      if (captcha.success) {
        const createdVisitor = await new this.visitorModel(visitorDto);
        Logger.log('createdVisitor' + createdVisitor);
        if (createdVisitor) {
          return createdVisitor.save();
        } else {
          return 'mongodb';
        }
      } else {
        return 'captcha';
      }
    } else {
      return 'mongodb';
    }
  }

  async findAll(): Promise<Visitor[]> {
    return await this.visitorModel.find().exec();
  }

  /*   captcha(token: any) {
    const body = encodeURIComponent(JSON.stringify({
      secret: process.env.captcha,
      response: token.token,
    }));
    Logger.log('entro serviço');

    Logger.log(body);

    return this.http
      .get('https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.captcha + '&response=' + token.token)
      .pipe(
        map(response => response.data),
        catchError(err => Observable.throw(err.message)),
      )
      .toPromise();
  } */
}

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
    // Logger.log('DTO' + visitorDto.recaptcha);
    if (visitorDto.recaptcha) {
      const captcha = await this.captcha(visitorDto);

      if (captcha.success === true) {
        const createdVisitor = new this.visitorModel(visitorDto);
        // Logger.log('Visitor' + createdVisitor);
        if (createdVisitor) {
          try {
            const save = await createdVisitor.save();
            return save;
            // Logger.log(save);
          } catch (err) {
            // Logger.log('err');
            throw new Error('err.code');
            // return 'err';
          }
        } else {
          throw new Error('database');
        } /*  */
      } else {
        throw new Error('captcha');
      }
    } else {
      throw new Error('database');
    }
  }

  async findAll(): Promise<Visitor[]> {
    return await this.visitorModel.find().exec();
  }

  captcha(visitorDto: VisitorDto): Promise<any> {
    return this.http
      .get(
        'https://www.google.com/recaptcha/api/siteverify?secret=' +
          process.env.captcha +
          '&response=' +
          visitorDto.recaptcha,
          // '6LdXKY8UAAAAAPxe_nL-1yIlyPQentSg3afyK6s9'
      )
      .pipe(map(response => response.data))
      .toPromise();
  }
}

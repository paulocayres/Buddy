import {
  Controller,
  Render,
  Get,
  Post,
  Body,
  Logger,
} from '@nestjs/common';
import { VisitorDto } from './visitor.dto';
import { VisitorsService } from './visitors.service';

@Controller('visitors')
export class VisitorsController {
  ret: any;
  constructor(private readonly visitorsService: VisitorsService) {}

  @Get()
  @Render('visitors')
  get() {
    return '';
  }

  @Post()
  @Render('visitors')
  async create(@Body() visitorDto: VisitorDto) {
      const visitor = await this.visitorsService.create(visitorDto);

      Logger.log('visitorController' + visitor);

      if (visitor === 'captcha') {
        return { message: 'Alerta do Google Captcha, tente novamente' };
      } else if (visitor === 'mongodb') {
        return { message: 'Falha no cadastro, tente novamente' };
      } else {
        return { message: 'Cadastro realizado com sucesso' };
      }

  }

/*   @Post('/captcha')
  async captcha(@Body() token) {
    Logger.log('Entrou');
    return this.visitorsService.captcha(token);
  } */
}

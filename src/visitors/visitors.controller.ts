import { Controller, Render, Get, Post, Body, Logger } from '@nestjs/common';
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
    try {
      const visitor = await this.visitorsService.create(visitorDto);
      Logger.log('visitorController' + visitor);
      return { message: 'Cadastro realizado com sucesso' };
    } catch (err) {
      Logger.log(err);
      if (err.toString() === 'Error: 11000') {
        return { message: 'Email já cadastrado' };
      } else if (err.toString() === 'Error: database') {
        return { message: 'Falha ao cadastrar, tente novamente' };
      } else if (err.toString() === 'Error: captcha') {
        return { message: 'Captcha inválido, tente novamente' };
      }
      return { message: err };
    }
  }
}

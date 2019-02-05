import { Controller, Render, Get, Post, Body, Res } from '@nestjs/common';
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
      return { message: 'Cadastro realizado com sucesso' };
    } catch {
      return { message: 'Falha no cadastro, tente mais terde' };
    }
  }

  @Post('visitors/captcha')
  async captcha(@Body() token: any, @Res() response) {
    const res = this.visitorsService.captcha(token);
    res
      .then(rs => {
        response.send(res);
      })
      .catch(err => {
        response.send(err);
      });
  }
}

import { Controller, Render, Get, Post, Body } from '@nestjs/common';
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

}

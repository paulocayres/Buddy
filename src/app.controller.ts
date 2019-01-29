import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { VisitorDto } from './visitors/visitor.dto';
import { Visitor } from './visitors/visitor.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
    get() {
      return '';
    }

  @Post()
  async create(@Body() visitorDto: VisitorDto) {
    this.appService.create(visitorDto);
  }
}

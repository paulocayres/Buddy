import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { VisitorDto } from './visitor.dto';
import { Visitor } from './visitor.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async findAll(): Promise<Visitor[]> {
    return this.appService.findAll();
  }

  @Post()
  async create(@Body() visitorDto: VisitorDto) {
    this.appService.create(visitorDto);
  }
}

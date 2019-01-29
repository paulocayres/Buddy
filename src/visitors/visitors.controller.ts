import { Controller, Render, Get, Post, Body, Logger } from '@nestjs/common';
import { VisitorDto } from './visitor.dto';
/* import { Visitor } from '../visitor.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'; */
import { VisitorsService } from './visitors.service';

@Controller('visitors')
export class VisitorsController {

    constructor(private readonly visitorsService: VisitorsService) {}

  @Get()
  @Render('visitors')
    get() {
      Logger.log(this.visitorsService.findAll());
    }

  @Post()
  @Render('visitors')
  async create(@Body() visitorDto: VisitorDto) {
    Logger.log(visitorDto);
    this.visitorsService.create(visitorDto);
  }
}

import { Module } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { VisitorsController } from './visitors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorSchema } from './visitor.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Visitor', schema: VisitorSchema }])],
    controllers: [VisitorsController],
    providers: [VisitorsService],
    exports: [VisitorsService],
})
export class VisitorsModule {}

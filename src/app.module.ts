import { Module, Options } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorSchema } from './visitor.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/buddy', {useNewUrlParser: true}),
  MongooseModule.forFeature([{ name: 'Visitor', schema: VisitorSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

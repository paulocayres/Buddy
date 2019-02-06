import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorsModule } from './visitors/visitors.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/buddy', {useNewUrlParser: true}),
  // 'mongodb://paulo.cayres:pccr0976@ds245277.mlab.com:45277/buddy'
  // 'mongodb://localhost:27017/buddy'
  VisitorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

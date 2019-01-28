import { Module, Options } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorSchema } from './visitor.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://paulo.cayres:pccr0976@ds245277.mlab.com:45277/buddy', {useNewUrlParser: true}),
  MongooseModule.forFeature([{ name: 'Visitor', schema: VisitorSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

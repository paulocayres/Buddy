import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as path from 'path';
import { AppModule } from './app.module';
import * as sassMiddleware from 'node-sass-middleware';

 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useStaticAssets(join(__dirname, 'public'));
  app.useStaticAssets(join(__dirname, 'images'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  app.use(require('node-sass-middleware')({
    src: __dirname,
    dest: __dirname,
    debug: true,
    outputStyle: 'compressed',
  }));

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useStaticAssets(path.join(__dirname, 'public'));
  app.useStaticAssets(path.join(__dirname, 'public/css'));
  app.useStaticAssets(path.join(__dirname, 'public/images'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  app.use(require('node-sass-middleware')({
    src:  __dirname + '/public/css',
    dest: __dirname + '/public/css',
    debug: true,
    outputStyle: 'compressed',
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

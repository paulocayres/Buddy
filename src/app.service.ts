import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello()  {
    return { image: '../src/images/buddy_icone.png', message: 'Hello World Teste!' };
  }
}

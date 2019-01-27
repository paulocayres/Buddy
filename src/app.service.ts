import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello()  {
    return { image: 'buddy_icone.png', message: 'Hello World Teste!' };
  }
}

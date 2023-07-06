import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pdf')
  async getPdf() {
    const buffer = await this.appService.getPdf();
    return buffer;
  }

  @Get('mi-factura')
  miFactura() {
    return `
    <html>
      <head>
        <title>Mi Factura</title>
      </head>
      <body>
        <h1>Mi Factura</h1>
        <p>
          Lo hemos logrado JOPUCHA!!!
        </p>
      </body>
    </html>`;
  }
}

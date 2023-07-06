import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPdf() {
    try {
      let buffer = null;
      const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/usr/lib/chromium/chromium',
        args: ['--no-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto(`http://localhost:3000/mi-factura`, {
        waitUntil: 'networkidle0',
      });

      buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          left: '0px',
          top: '0px',
          right: '0px',
          bottom: '0px',
        },
      });
      await browser.close();
      return buffer;
    } catch (error) {
      console.error('error :>> ', error);
    }
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';
import { Request, Response } from 'express';
import { parse as parseURL } from 'url';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: this.configService.get<string>('NODE_ENV') !== 'PRODUCTION',
        dir: './src/client',
      });
      await this.server.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  handler(req: Request, res: Response) {
    return this.server.getRequestHandler()(req, res);
  }

  getNextServer(): NextServer {
    return this.server;
  }

  async handleThroughNext(req: Request, res: Response) {
    const parsedUrl = parseURL(req.url, true);
    await this.server.render(req, res, parsedUrl.pathname, parsedUrl.query);
  }
}

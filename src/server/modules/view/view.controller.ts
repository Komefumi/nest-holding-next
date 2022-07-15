import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { ViewService } from './view.service';

@Controller('')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get(['/', '_next*'])
  public async show(@Req() req: Request, @Res() res: Response) {
    this.viewService.handleThroughNext(req, res);
  }
}

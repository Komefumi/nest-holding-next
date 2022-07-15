import { Module } from '@nestjs/common';
// import { RenderModule } from 'nest-next';
import { ConfigModule } from '@nestjs/config';
import { ViewModule } from './modules/view/view.module';
// import Next from 'next';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    /*
    RenderModule.forRootAsync(Next({ dev: true, dir: 'src/client' }), {
      viewsDir: null,
    }),
    */
    ViewModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

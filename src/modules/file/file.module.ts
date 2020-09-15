import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as moment from 'moment';

/**
 * 文件上传单独模块
 */

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 文件存储路径
        destination: path.resolve(__dirname, '../../asset/avatar'),
        filename: (req, file, cb) => {
          // 自定义文件名
          const filename = `${moment().format('YYYY-MM-DD HH:mm:ss')}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
          // return cb(null, file.originalname);
        },
      }),
    }),

  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }

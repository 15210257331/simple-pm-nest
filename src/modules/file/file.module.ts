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
        destination: (req, file, cb) => {
          const filePath = path.resolve(__dirname, '../../asset/img');
          console.log(filePath);
          cb(null, filePath);
        },
        filename: (req, file, cb) => {
          // 自定义文件名
          const filename = `${moment().format('x')}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),

  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }

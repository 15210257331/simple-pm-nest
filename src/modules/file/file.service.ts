/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {

    async uploadedFile(file: any, body: any): Promise<any> {
        return {
            code: 10000,
            data: file.path,
            msg: '上传成功'
        }
    }
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ScheduleAddDTO {
    @IsNotEmpty({ message: '日程名称不能为空' })
    readonly name: string;
    @IsNotEmpty({ message: '内容不能为空' })
    readonly content: string;
    @IsNotEmpty({ message: '参与人不能为空' })
    readonly participant: any[];
}


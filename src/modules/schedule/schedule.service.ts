import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { ScheduleAddDTO } from './dto/schedule-add.dto';
import { Schedule } from '../../entity/schedule.entity';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule) private readonly scheduleRepository: Repository<Schedule>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async scheduleList(request: any): Promise<any> {
        try {
            // const userQb = await this.userRepository
            //     .createQueryBuilder("user")
            //     .where("user.id = :id", { id: request.user.userId });

            // const schedules = await this.scheduleRepository
            //     .createQueryBuilder("schedule")
            //     .where("schedule.creator= " + userQb.getQuery() + ")")
            //     .leftJoinAndSelect('schedule.creator', 'creator')
            //     .leftJoinAndSelect('schedule.participant', 'participant')
            //     .getMany();

                
            const doc = await this.scheduleRepository.createQueryBuilder("schedule")
                .where(qb => {
                    const subQuery = qb
                        .subQuery()
                        .select("user.id")
                        .from(User, "user")
                        .where("user.id = :id")
                        .getQuery();
                    return "schedule.creator= " + subQuery;
                })
                .setParameter("id", request.user.userId)
                .leftJoinAndSelect('schedule.creator', 'creator')
                .leftJoinAndSelect('schedule.participant', 'participant')
                .getMany();
            return {
                code: 10000,
                data: doc,
                msg: 'Success',
            };
        } catch (error) {
            return {
                code: 9999,
                msg: error,
            };
        }
    }

    async scheduleAdd(scheduleAddDTO: ScheduleAddDTO, request: any): Promise<any> {
        try {
            const data = new Schedule();
            data.name = scheduleAddDTO.name;
            data.content = scheduleAddDTO.content;
            data.creator = await this.userRepository.findOne(request.user.userId);
            data.participant = await this.userRepository.findByIds(scheduleAddDTO.participant);
            const doc = await this.scheduleRepository.save(data);
            return {
                code: 10000,
                data: doc,
                msg: 'Success',
            };
        } catch (error) {
            return {
                code: 9999,
                msg: error,
            };
        }
    }

    async scheduleDelete(id: string | number): Promise<any> {
        try {
            const doc = await this.scheduleRepository.delete(id)
            return {
                code: 10000,
                data: doc,
                msg: 'Success',
            };
        } catch (error) {
            return {
                code: 9999,
                msg: error,
            };
        }
    }

}

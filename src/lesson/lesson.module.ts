import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
    providers: [
        LessonResolver,
        LessonService,
    ],
    imports: [
        TypeOrmModule.forFeature([
            Lesson,
        ])
    ],
})
export class LessonModule {}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewLessonDto } from './dto/new-lesson.dto';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query(returns => LessonType)
  lesson() {
    return {
      id: '1',
      name: 'Japanese Class',
      initDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Mutation(returns => LessonType)
  async createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<Lesson> {
    const newLessonDto: NewLessonDto = new NewLessonDto(
      name,
      startDate,
      endDate
    );
    return this.lessonService.createLesson(newLessonDto);
  }
}

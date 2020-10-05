import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssignStudentInput } from './inputs/assign-students.input';
import { NewLessonInput } from './inputs/new-lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query(returns => LessonType)
  async getLessonById(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLessonById(id);
  }

  @Query(returns => [LessonType], {})
  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonService.getAllLessons();
  }

  @Mutation(returns => LessonType)
  @UsePipes(ValidationPipe)
  async createLesson(
    @Args('newLessonInput') newLessonInput: NewLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(newLessonInput);
  }

  @Mutation(_ => LessonType)
  @UsePipes(ValidationPipe)
  async assignStudentsToLesson(
    @Args('assignStudentsInput') assignStudentsInput: AssignStudentInput,
  ) {
    return this.lessonService.assignStudentsToLesson(assignStudentsInput);
  }
}

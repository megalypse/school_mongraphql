import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { StudentService } from 'src/student/student.service';
import { getRepository } from 'typeorm';
import { AssignStudentInput } from './inputs/assign-students.input';
import { NewLessonInput } from './inputs/new-lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query(_ => LessonType)
  async getLessonById(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLessonById(id);
  }

  @Query(_ => [LessonType], {})
  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonService.getAllLessons();
  }

  @Mutation(_ => LessonType)
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

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}

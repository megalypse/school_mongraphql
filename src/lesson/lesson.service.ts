import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { NewLessonInput } from './inputs/new-lesson.input';
import { AssignStudentInput } from './inputs/assign-students.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}
  
  async getLessonById(id: string): Promise<Lesson> {
    const lesson: Lesson = await this.lessonRepository.findOne({ id });

    if(!lesson) {
      throw new NotFoundException();
    }

    return lesson;
  }

  async getAllLessons(): Promise<Lesson[]> {
    const lessons: Lesson[] = await this.lessonRepository.find();

    return lessons;
  }

  async createLesson(newLessonInput: NewLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = newLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(assignStudentsToLesson: AssignStudentInput): Promise<Lesson> {
    const { lessonId, studentsIds } = assignStudentsToLesson;
    const lesson: Lesson = await this.lessonRepository.findOne({ id: lessonId });
    
    studentsIds.forEach(id => {
      if(!lesson.students.includes(id)) {
        lesson.students.push(id);
      }
    });

    await this.lessonRepository.save(lesson);
    return lesson;
  }
}

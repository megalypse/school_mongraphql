import { Injectable, NotFoundException } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/lesson.entity';
import { getRepository, Repository } from 'typeorm';
import { NewStudentInput } from './inputs/new-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async newStudent(newStudentInput: NewStudentInput): Promise<Student> {
    const lessonRepository: Repository<Lesson> = getRepository(Lesson);
    const { name, document, lessonsIds } = newStudentInput;

    const student: Student = this.studentRepository.create({
      id: uuid(),
      name,
      document,
    });

    const lessons: Lesson[] = await lessonRepository.find({
      where: {
        id: {
          $in: lessonsIds,
        }
      }
    });

    lessons.forEach(lesson => {
      if(!(lesson.students.includes(student.id))) {
        lesson.students.push(student.id);
      }
    });

    await lessonRepository.save(lessons);
    await this.studentRepository.save(student);
    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    const students: Student[] = await this.studentRepository.find();

    return students;
  }

  async getStudentById(id: string): Promise<Student> {
    const student: Student = await this.studentRepository.findOne({ id });

    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }

  async getManyStudents(ids: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: ids,
        }
      }
    });
  }
}

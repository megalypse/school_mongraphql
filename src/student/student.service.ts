import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/lesson.entity';
import { Repository } from 'typeorm';
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
    const { name, document } = newStudentInput;

    const student: Student = this.studentRepository.create({
      id: uuid(),
      name,
      document,
    });

    await this.studentRepository.save(student);
    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    const students: Student[] = await this.studentRepository.find();

    return students;
  }

  async getStudentById(id: string): Promise<Student> {
    const student: Student = await this.studentRepository.findOne({ id });

    if(!student) {
      throw new NotFoundException();
    }

    return student;
  }
}

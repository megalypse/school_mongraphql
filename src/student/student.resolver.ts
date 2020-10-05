import { UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewStudentInput } from "./inputs/new-student.input";
import { Student } from "./student.entity";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
  ) {}

  @Mutation(_ => StudentType)
  @UsePipes(ValidationPipe)
  async newStudent(@Args('newStudentInput') newStudentInput: NewStudentInput): Promise<Student> {
    return this.studentService.newStudent(newStudentInput);
  }

  @Query(_ => [StudentType])
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Query(_ => StudentType)
  async getStudentById(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }
}

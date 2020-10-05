import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewStudentInput } from './inputs/new-student.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';

const mockNewStudentInput = {
  name: 'John Doe',
  document: '00000000000',
};

describe('StudentService', () => {
  let studentService: StudentService;
  let studentRepository: any;
  const mockId: string = '123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  describe('New Student', () => {
    it('Creates a new student in the database', async () => {
      // jest.spyOn(studentRepository, 'create');
      studentRepository.create = jest
        .fn()
        .mockReturnValue(mockNewStudentInput as Student);
      jest.spyOn(studentRepository, 'save');

      expect(
        studentService.newStudent(mockNewStudentInput as NewStudentInput),
      ).resolves.toEqual(mockNewStudentInput as NewStudentInput);
      expect(studentRepository.save).toHaveBeenCalledTimes(1);
      expect(studentRepository.create).toHaveBeenCalledWith(
        mockNewStudentInput as NewStudentInput,
      );
      expect(studentRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get all students', () => {
    it('Sucessfully get all students from database', async () => {
    const mockReturn: [] = [];
    studentRepository.find = jest.fn().mockResolvedValue(mockReturn);
    
    const result = await studentService.getAllStudents();
  
      expect(studentRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockReturn);
    });
  });

  describe('Get student by id', () => {
    it('Sucessfully get student by id', async () => {
      studentRepository.findOne = jest.fn().mockResolvedValue(mockNewStudentInput);

      expect(studentService.getStudentById(mockId)).resolves.toEqual(mockNewStudentInput);
      expect(studentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(studentRepository.findOne).toHaveBeenCalledWith({ id: mockId });
    });

    it('Fails to get student by id due to inexistent id', async () => {
      studentRepository.findOne = jest.fn().mockResolvedValue(null);

      expect(studentService.getStudentById(mockId)).rejects.toThrow(NotFoundException);
    });
  });
});

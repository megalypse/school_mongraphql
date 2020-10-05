import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewLessonInput } from './inputs/new-lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

const mockLessonObject = {
  id: '123',
  name: 'Class',
  startDate: (new Date()).toISOString(),
  endDate: (new Date()).toISOString(),
};

describe('LessonService', () => {
  let lessonService: LessonService;
  let lessonRepository: Repository<Lesson>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        {
          provide: getRepositoryToken(Lesson),
          useValue: {
            create: jest.fn().mockReturnValue(mockLessonObject),
            save: jest.fn(),
          }
        }
      ],
    }).compile();

    lessonService = module.get<LessonService>(LessonService);
    lessonRepository = module.get<Repository<Lesson>>(getRepositoryToken(Lesson));
  });

  it('Creates and sucessfully saves a lesson', async () => {
    jest.spyOn(lessonRepository, 'create');
    jest.spyOn(lessonRepository, 'save');

    lessonService.createLesson(mockLessonObject as NewLessonInput);
    expect(lessonRepository.create).toHaveBeenCalledTimes(1);
    expect(lessonRepository.save).toHaveBeenCalledTimes(1)
    expect(lessonRepository.save).toHaveBeenCalledWith(mockLessonObject);
  });
});

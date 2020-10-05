import { Lesson } from "src/lesson/lesson.entity";
import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(['document'])
export class Student extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  lessons: Lesson[]
}
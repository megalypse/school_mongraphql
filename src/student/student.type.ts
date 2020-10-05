import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Lesson } from "src/lesson/lesson.entity";

@ObjectType('Student')
export class StudentType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  document: string;

  // @Field()
  // lessons: Lesson[]
}
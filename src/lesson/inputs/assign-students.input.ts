import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AssignStudentInput {
  @Field()
  lessonId: string;

  @Field()
  studentsIds: string[];
}
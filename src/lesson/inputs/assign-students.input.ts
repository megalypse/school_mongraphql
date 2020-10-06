import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentInput {
  @IsUUID('4')
  @Field(_ => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field(_ => [ID])
  studentsIds: string[];
}
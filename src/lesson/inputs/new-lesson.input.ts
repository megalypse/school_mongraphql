import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, IsUUID, MinLength } from "class-validator";

@InputType()
export class NewLessonInput {
  @MinLength(1)
  @Field()
  name: string;
  
  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID(4, { each: true })
  @Field(_ => [ID],  { defaultValue: [] })
  studentsIds: string[];
}
import { Field, ID, InputType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsNumberString, IsUUID } from "class-validator";

@InputType()
export class NewStudentInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Field()
  document: string;

  @IsNotEmpty()
  @IsUUID(4, { each: true })
  @Field(_ => [ID], { defaultValue: [] })
  lessonsIds: string[];
}
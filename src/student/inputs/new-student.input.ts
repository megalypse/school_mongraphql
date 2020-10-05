import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsNumberString } from "class-validator";

@InputType()
export class NewStudentInput {
  @IsNotEmpty()
  @IsAlpha()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Field()
  document: string;
}
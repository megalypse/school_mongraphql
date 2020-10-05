import { start } from "repl";

export class NewLessonDto {
  constructor(name, startDate, endDate) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  name: string;
  startDate: string;
  endDate: string;
}
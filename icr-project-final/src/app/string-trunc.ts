import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'stringTrunc'})
export class StringTruncationPipe implements PipeTransform {
  transform(value: string, numberOfChars: number): string {
    if (value.length < numberOfChars) {
      return value;
    }
    return value.substring(0, numberOfChars) + "...";
  }
}
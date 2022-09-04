import { object, number, string } from '@ts-v/kit';

export const schema = object({
  name: string('Please enter your name'),
  age: number('Please enter your age'),
});

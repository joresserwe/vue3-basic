import { Item } from './ItemType.interface';

export interface Todo extends Item {
  subject: string,
  body: string,
  completed: boolean
}

export const emptyTodo: Todo = {
  subject: '',
  body: '',
  completed: false,
};

import nanoid from 'nanoid';
import { Todo } from '../models/todo';
import { VisibilityFilters } from '../models/visibility-filters';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

export class AddTodoAction {
  readonly type = ADD_TODO;
  public todo: Todo;
  constructor(task: string) {
    this.todo = new Todo(nanoid(), task);
  }
}

export class UpdateTodoAction {
  readonly type = UPDATE_TODO_STATUS;
  constructor(public todo: Todo, public complete: boolean) {}
}

export class UpdateFilterAction {
  readonly type = UPDATE_FILTER;
  constructor(public filter: VisibilityFilters) {}
}

export class ClearCompletedAction {
  readonly type = CLEAR_COMPLETED;
}

export type Actions =
  | AddTodoAction
  | UpdateTodoAction
  | UpdateFilterAction
  | ClearCompletedAction;

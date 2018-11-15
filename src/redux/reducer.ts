import { createSelector } from 'reselect';

import {
  ADD_TODO,
  UPDATE_FILTER,
  UPDATE_TODO_STATUS,
  CLEAR_COMPLETED,
  Actions
} from './actions';
import { VisibilityFilter } from '../models/visibility-filter';
import { State } from '../models/state';

export const reducer = (state = new State(), action: Actions): State => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.todo.id
            ? { ...action.todo, complete: action.complete }
            : todo
        )
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.complete)
      };
    default:
      return state;
  }
};

const getTodosSelector = (state: State) => state.todos;
const getFilterSelector = (state: State) => state.filter;

export const getVisibleTodosSelector = createSelector(
  getTodosSelector,
  getFilterSelector,
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilter.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);
      case VisibilityFilter.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);
      default:
        return todos;
    }
  }
);

export const statsSelector = createSelector(
  getTodosSelector,
  todos => {
    const completed = todos.filter(todo => todo.complete).length;
    return {
      completed,
      active: todos.length - completed
    };
  }
);

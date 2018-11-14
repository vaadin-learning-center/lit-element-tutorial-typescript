import { Todo } from './todo';
import { VisibilityFilters } from './visibility-filters';

export class State {
  constructor(
    public todos: Todo[] = [],
    public filter: VisibilityFilters = VisibilityFilters.SHOW_ALL
  ) {}
}

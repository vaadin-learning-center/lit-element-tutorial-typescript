import { html, property } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { getVisibleTodosSelector } from '../redux/reducer';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store';
import { Todo } from '../models/todo';
import { VisibilityFilter } from '../models/visibility-filter';
import { State } from '../models/state';
import {
  AddTodoAction,
  UpdateTodoAction,
  UpdateFilterAction,
  ClearCompletedAction
} from '../redux/actions';
import { BaseView } from './base-view';

class TodoView extends connect(store)(BaseView) {
  @property()
  private todos: Todo[];
  @property()
  private filter: string;
  @property()
  private task: string;

  stateChanged(state: State) {
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.filter;
  }

  render() {
    return html`
      <style>
        todo-view {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }

        todo-view .input-layout {
          width: 100%;
          display: flex;
        }

        todo-view .input-layout vaadin-text-field {
          flex: 1;
          margin-right: var(--spacing);
        }

        todo-view .todos-list {
          margin-top: var(--spacing);
        }

        todo-view .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
      </style>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Task"
          value="${this.task || ''}"
          @change="${this.updateTask}"
        ></vaadin-text-field>

        <vaadin-button theme="primary" @click="${this.addTodo}">
          Add Todo
        </vaadin-button>
      </div>

      <div class="todos-list">
        ${
          this.todos.map(
            todo => html`
              <div class="todo-item">
                <vaadin-checkbox
                  ?checked="${todo.complete}"
                  @change="${
                    (e: { target: HTMLInputElement }) =>
                      this.updateTodoStatus(todo, e.target.checked)
                  }"
                >
                  ${todo.task}
                </vaadin-checkbox>
              </div>
            `
          )
        }
      </div>

      <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
        ${
          Object.values(VisibilityFilter).map(
            filter => html`
              <vaadin-radio-button value="${filter}"
                >${filter}</vaadin-radio-button
              >
            `
          )
        }
      </vaadin-radio-group>
      <vaadin-button @click="${this.clearCompleted}">
        Clear Completed
      </vaadin-button>
    `;
  }

  addTodo() {
    if (this.task) {
      store.dispatch(new AddTodoAction(this.task));
      this.task = '';
    }
  }

  shortcutListener(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  updateTask(e: { target: HTMLInputElement }) {
    this.task = e.target.value;
  }

  updateTodoStatus(updatedTodo: Todo, complete: boolean) {
    store.dispatch(new UpdateTodoAction(updatedTodo, complete));
  }

  filterChanged(e: { detail: { value: VisibilityFilter } }) {
    store.dispatch(new UpdateFilterAction(e.detail.value));
  }

  clearCompleted() {
    store.dispatch(new ClearCompletedAction());
  }
}

customElements.define('todo-view', TodoView);

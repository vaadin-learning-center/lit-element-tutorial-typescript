import { createStore, Action, Middleware, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { State } from '../models/state';

const STORAGE_KEY = '__todo_app__';

const saveState = (state: State) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
const loadState = (): State => {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : undefined;
};

// Turns class-based actions to plain JS objects for Redux
const actionToPlainObject: Middleware<{}, Action> = store => next => action =>
  next({ ...action });

export const store = createStore(
  reducer,
  loadState(),
  composeWithDevTools(applyMiddleware(actionToPlainObject))
);

store.subscribe(() => {
  saveState(store.getState());
});

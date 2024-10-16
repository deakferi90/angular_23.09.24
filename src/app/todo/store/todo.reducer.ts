import { createReducer, on } from '@ngrx/store';
import { addTodo, removeTodo, toggleTodo } from './todo.actions';
import { Todo } from '../models/todo.model';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { text }) => [
    ...state,
    { id: Date.now(), text, completed: false },
  ]),
  on(removeTodo, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(toggleTodo, (state, { id }) =>
    state.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  )
);

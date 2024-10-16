import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { toggleTodo, removeTodo } from '../store/todo.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(private store: Store) {}

  // toggleComplete() {
  //   this.store.dispatch(toggleTodo({ id: this.todo.id }));
  // }

  removeTodo() {
    this.store.dispatch(removeTodo({ id: this.todo.id }));
  }
}

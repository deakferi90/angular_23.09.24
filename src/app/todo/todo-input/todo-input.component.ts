import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTodo } from '../store/todo.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent {
  todoText: string = '';

  constructor(private store: Store) {}

  addTodo() {
    if (this.todoText.trim()) {
      this.store.dispatch(addTodo({ text: this.todoText }));
      this.todoText = '';
    }
  }
}

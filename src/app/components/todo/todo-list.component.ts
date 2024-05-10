import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/core/services/todo.service';
import { ITodo } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template:`
    <div class="todo-card-container" *ngFor="let todo of todos$ | async">
      <div class="todo-card"  *ngIf="todo.email===email">
          <div class="todo-left">
          <input type="checkbox" [checked]="todo.effectue" (click)="updateTodo(todo)">
            <div class="todo-info" [ngClass]="{check:todo.effectue}">
            <h4 class="title">{{ todo.titre }}</h4>
            <span class="desctiption">{{ todo.description }}</span>
            </div>
          </div>
          <button class="toolbar-btn" (click)="deleteTodo(todo)">Supprimer</button>
      </div>
    </div>
  `,
  styles: [`
    .todo-card-container{
        margin-left:15%;
    }
    .todo-card{
      display:flex;
      justify-content:space-between;
      align-items:center;
      width:80%;
      background-color:rgba(white,.4);
      margin-top:1rem;
      padding:1rem;
      box-shadow:0 0 10px 2px rgba(gray,.2);

      .todo-left{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:1rem;

        input{
          transform:scale(1.3)
        }

        .desctiption{
          font-size:.8rem;
        }
      }

      .toolbar-btn{
        background-color:rgba(red,.75)
      }
    }
    .check{
        text-decoration: line-through;
    }
  `]
})
export class TodoListComponent {
  private todoService = inject(TodoService)
  readonly todos$ = this.todoService.getTodos()
  email = localStorage.getItem('email')

  updateTodo(todo:ITodo){
    todo.effectue = !todo.effectue
    this.todoService.updateTodo(todo)
  }

  deleteTodo = (todo:ITodo) => this.todoService.deleteTodo(todo)
}

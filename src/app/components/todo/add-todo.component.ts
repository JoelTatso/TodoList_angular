import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';
import { ITodo } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <form [formGroup]="addTodoForm" (ngSubmit)="onSubmit()" class="form">
        <input type="text" placeholder="Titre" formControlName="titre">
        <input type="text" placeholder="Description" formControlName="description">
        <button class="toolbar-btn" [disabled]="addTodoForm.invalid" type="submit">Ajouter</button>
    </form>
  `,
  styles: [`
    .form{
      margin-top:3rem !important;
      gap:8px;

      input{
        padding:.6rem;
        border-radius:8px;
        width:20%;
      }
    }
  `]
})
export class AddTodoComponent {

  private todoService = inject(TodoService)

  addTodoForm = new FormGroup({
      titre: new FormControl(null,Validators.required),
      description: new FormControl(null)
  })

 async onSubmit(){
     const titre = this.addTodoForm.value.titre!
     const description = this.addTodoForm.value.description!

     const email = localStorage.getItem('email')?.toString()

     const todo:ITodo={email:email,titre:titre,description:description,effectue:false}
     await this.todoService.addTodo(todo)

     this.addTodoForm.reset()
  }
} 

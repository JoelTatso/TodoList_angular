import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "../shared/toolbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
    selector: 'app-register',
    standalone: true,
    template: `
   <app-toolbar [registerBtnShow]="true"></app-toolbar>
   <div class="form">
    <form [formGroup]="registerForm" (ngSubmit)="submit()">
         <h1 class="title">Inscrivez-vous</h1>
          <div class="form-group">
            <input type="email" class="form-control" id="email" formControlName="email" placeholder="Email">
            <input type="password" class="form-control" id="password" formControlName="password" placeholder="Password">
          </div>
          <button [disabled]="registerForm.invalid" class="toolbar-btn" type="submit">S'inscrire</button>
      </form>
  </div>
  `,
    styles: [],
    imports: [CommonModule, ToolbarComponent,ReactiveFormsModule]
})


export default class RegisterComponent {

  private router = inject(Router)
  private todoService = inject(TodoService)

  registerForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,Validators.required)
  });

 async submit(){
    const email = this.registerForm.value.email!
    const password = this.registerForm.value.password!
    localStorage.setItem('email',email)
    const user:IUser = {email,password}
    await this.todoService.createUser(user)
     this.router.navigateByUrl('todos')

  }
}
 
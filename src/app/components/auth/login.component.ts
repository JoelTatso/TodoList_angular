import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "../shared/toolbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, RouterLink],
  template: `
      <app-toolbar [loginBtnShow]="true"></app-toolbar>

      <div class="form">
        <form [formGroup]="loginForm" (ngSubmit)="submit()">
            <h1 class="title">Connectez-vous</h1>
              <div class="form-group">
                <input type="email" class="form-control" id="email" formControlName="email" placeholder="Email">
                <input type="password" class="form-control" id="password" formControlName="password" placeholder="Password">
                <p class="alert" *ngIf="showError">{{ errorMsg }}</p>
              </div>
              <button [disabled]="loginForm.invalid" class="toolbar-btn" type="submit">Se connecter</button>
              <p class="register">
            <span>Aucun Compte ?</span>
            <a routerLink="/register">Inscrivez-vous &rightarrow;</a>
          </p>
          </form>
      </div>
  `,
  styles: [],
})
export default class LoginComponent {

  showError = false;
  errorMsg = 'Email ou mot de passe incorrect !!!';
  private todoService = inject(TodoService) 
  private router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,Validators.required)
  });

 async submit() {
    const email = this.loginForm.value.email!
    const password = this.loginForm.value.password!
    const user = await this.todoService.Login(email)
    if(user?.email === email && user?.password === password){
      localStorage.setItem('email',email);
      this.router.navigateByUrl('todos')
    }else{
      this.showError = true
    }
}

}

import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  template: `
    <nav class="toolbar">
    <a routerLink="/" class="app-title">TodoApp</a>
    <span class="user">{{ user }}</span>
      <button class="toolbar-btn" routerLink="/login" *ngIf="registerBtnShow">Se connecter</button>
      <button class="toolbar-btn" routerLink="/register" *ngIf="loginBtnShow ">S'inscrire</button>
      <button class="toolbar-btn" routerLink="/login" *ngIf="logoutBtnShow" (click) = "logout()">Déconnexion</button>
    </nav>
  `,
  styles: [`
    .toolbar{
        height: 4rem;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding: 0 1rem;
       // border-bottom:1px solid gray;
        position:sticky;
        box-shadow:0 0 10px 2px gray;
      }
      .app-title{
      color:black;
      text-decoration:none;
      font-weight:bold;
      font-size:1.6rem;
    }
    .user{
      font-weight:bold;
    }
  `]
})
export class ToolbarComponent {
    //Afficher les bouttons en fonction des pages
    @Input() loginBtnShow !: boolean
    @Input() registerBtnShow !: boolean
    @Input() logoutBtnShow !: boolean

    logout = () => localStorage.removeItem('email')

    private todoService = inject(TodoService)
    public user = localStorage.getItem('email')
}

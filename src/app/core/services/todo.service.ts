import { Injectable, inject } from '@angular/core';
import { AngularTodoDb } from './db';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';
import { ITodo } from '../models/todo.model';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

    database = new AngularTodoDb()
    private router = inject(Router)

    Login = (email:string) => this.database.users.get(email)
    createUser = (user:IUser) => {this.database.users.add(user)}
    getUsers = () => this.database.users.toArray()

    isLoggedIn = () => {
        if(localStorage.getItem('email')){
          return true
        }else{
          this.router.navigateByUrl('login')
          return false
        }
    }


    //todo service 
    addTodo = (todo:ITodo) => this.database.todos.add(todo)
    getTodos = () => liveQuery(() => this.database.todos.toArray())
    updateTodo = (todo:ITodo) => this.database.todos.update(todo.id!,todo)
    deleteTodo = (todo:ITodo) => this.database.todos.delete(todo.id!)

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "../shared/toolbar.component";
import { AddTodoComponent } from "./add-todo.component";
import { TodoListComponent } from "./todo-list.component";

@Component({
    selector: 'app-todo',
    standalone: true,
    template: `
     <app-toolbar [logoutBtnShow]="true"></app-toolbar>
     <app-add-todo></app-add-todo>
     <app-todo-list></app-todo-list>
  `,
    styles: [],
    imports: [CommonModule, ToolbarComponent, AddTodoComponent, TodoListComponent]
})
export default class TodoComponent {

}

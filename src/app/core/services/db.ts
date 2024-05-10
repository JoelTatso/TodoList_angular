import Dexie,{Table} from "dexie";
import { IUser } from "../models/user.model";
import { ITodo } from "../models/todo.model";

export class AngularTodoDb extends Dexie{

    users !: Table<IUser,string>
    todos !: Table<ITodo,string>
    constructor(){
        super('AngularTodoDb')
        this.version(1).stores({
            users:'email,password',
            todos:'++id,email,titre,description,effectue'

        })
    }
}
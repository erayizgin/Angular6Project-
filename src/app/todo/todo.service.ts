import { Injectable } from "@angular/core"

import { Http, Response, Headers, RequestOptions } from "@angular/http"
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { Todo } from "./todo";

@Injectable()
export class TodoService {

    constructor(private http:Http) {}

    todoUrl = "https://jsonplaceholder.typicode.com/todos";

    private createAuthorizationHeader(header:Headers){
        header.append("Authorization", btoa('engin:12345'))
    }

    getTodos():Observable<Todo[]>{
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        var requestOptions = new RequestOptions({headers:headers});
        
        return this.http.get(this.todoUrl,requestOptions)
                        .map((response:Response)=><Todo[]>response.json())
                        .do(data=>console.log("Todos Listed"))
                        .catch(this.handleError)
    }

    private handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error||'Server error');
    }
}
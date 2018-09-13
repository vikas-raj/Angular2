import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../model/IUser';

@Injectable()
export class UserService {
    readonly registration = 'api/Auth/Register';
    readonly login = 'api/Auth/Login';
    constructor(private http: Http) { }

    registerUser(user: User): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.registration}`;
        return this.http.post(url, user, options)
            .map((p) => this.extractData2(p))
            .do(data => console.log('saveDescription : ' + JSON.stringify(data)))
            .catch(this.handleError)

    }
    loginUser(model: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.login}`;
        return this.http.post(url, model, options)
            .map((p) => this.extractData2(p))
            .do(data => {
                localStorage.setItem('token', data.token);
            }
            )
            .catch(this.handleError)
        //return this.http.post(this.login + 'login', model).pipe(
        //    map((response: any) => {
        //        const user = response;
        //        if (user) {
        //            localStorage.setItem('token', user.token);
        //        }
        //    })
        //);
    }
    private extractData2(response: Response) {
        let body = response.json();
        return body || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
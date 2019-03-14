import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/IUser';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
  readonly registration = 'api/Auth/Register';
  readonly login = 'api/Auth/Login';
  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    let headersObj = new HttpHeaders({ 'Content-Type': 'application/json' });   

    const url = `${this.registration}`;
    return this.http.post(url, user, { headers: headersObj, observe: "response" }).pipe(
      map((p) => p),
      tap(data => console.log('saveDescription : ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  loginUser(model: any) {
    let headersObj = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const url = `${this.login}`;
    return this.http.post(url, model, { headers: headersObj, observe: "response" }).pipe(
      map((p) => this.extractData2(p)),
      tap(data => { localStorage.setItem('token', data.token); }),
      catchError(this.handleError));
  }
  private extractData2(response: HttpResponse<any>) {
    let body = response.body;
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

}

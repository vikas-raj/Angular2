import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class App_Service {
  readonly getUserInfo = 'api/Auth/GetUserInfo';
  constructor(private httpClient: HttpClient) {

  }

  getUserInformation() {
    const url = `${this.getUserInfo}`;
    let headersObj = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken')  });   

    return this.httpClient.get(url, { headers: headersObj, observe: "response" }).pipe(
      map((p) => p),
      tap(data => console.log('saveDescription : ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  private handleError(error: HttpResponse<any>): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.body || 'Server error');
  }

}

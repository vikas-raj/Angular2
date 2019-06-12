import { Observable } from "rxjs";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IJobDetails } from "../model/IJobDetails";
import { Injectable, Inject } from '@angular/core';
import { map, tap, catchError } from "rxjs/operators";
import { IComment } from "../model/IComment";

@Injectable()
export class SearchInfoService {

  constructor(private http: Http,
    //@Inject('BASE_URL') private baseUrl1: string
  ) {

  }
  readonly saveDescriptionurl = 'api/Description/SaveDescription';
  readonly deleteDescriptionurl = 'api/Description/DeleteDescription';
  readonly likeDescriptionurl = 'api/Description/LikeDescription';
  readonly commentDescriptionurl = 'api/Description/CommentDescription';
  readonly baseUrl = 'api/Description';


  getDescription(): Observable<IJobDetails[]> {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
    let options = new RequestOptions({ headers: headers });
    const url = `${this.baseUrl}`;
    return this.http.get(url, options).pipe(
      map(this.extractData),
      tap(data => console.log('GetDescription: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  getDescriptionById(id: number): Observable<IJobDetails> {

    if (id === 0) {
      return Observable.create((observer: any) => {
        observer.next(this.initializeSearchInfo());
        observer.complete();
      });
    };
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
    let options = new RequestOptions({ headers: headers });
    const url = `${this.baseUrl}/${id}`;
    //return this.http.get(this.baseUrl1 + url)
    return this.http.get(url, options).pipe(
      map(this.extractData),
      tap(data => console.log('GetDescription: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  saveDescription(description: IJobDetails): Observable<IJobDetails> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.saveDescriptionurl}`;

    return this.http.post(url, description, options).pipe(
      map((p) => this.extractData(p)),
      tap(data => console.log('saveDescription : ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  deleteDescription(description: string): Observable<IJobDetails> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url = `${this.deleteDescriptionurl}/${description}`;
    return this.http.delete(url, options).pipe(
      map((p) => this.extractData(p)),
      catchError(this.handleError));
  }

  likeDescription(description: IJobDetails): Observable<IJobDetails> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.likeDescriptionurl}`;

    return this.http.post(url, description, options).pipe(
      map((p) => this.extractData(p)),
      tap(data => console.log('likeDescription : ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  commentDescription(comment: IComment): Observable<IJobDetails> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.commentDescriptionurl}`;

    return this.http.post(url, comment, options).pipe(
      map((p) => this.extractData(p)),
      tap(data => console.log('commentDescription : ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  private extractData(response: any) {
    let body = response.json();
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  getKeySkills(searchSkill: string): any[] {
    return [];
  }

  initializeSearchInfo(): IJobDetails {
    // Return an initialized object
    return {
      jobDetailId: 0,
      aboutTheCompany: "",
      companyName: "",
      companyWebsite: "",
      jobLocation: "",
      position: "",
      salary: "",
      interviewVenue: "",
      eligibilityCriteria: "",
      howToApply: "",
      registrationLink: "",
      importantNote: "", eventDate: new Date("February 4, 2016 10:13:00"), experienceRequired: "", lastDateToApply: new Date("February 4, 2016 10:13:00"),
      likes: [],
      comments: []
    };
  }
}

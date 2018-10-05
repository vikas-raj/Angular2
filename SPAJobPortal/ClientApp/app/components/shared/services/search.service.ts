import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IJobDetails } from "../model/IJobDetails";
import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class SearchInfoService {
    
    constructor(private http: Http,
        //@Inject('BASE_URL') private baseUrl1: string
    ) {

    }
    readonly saveDescriptionurl = 'api/Description/SaveDescription';
    readonly deleteDescriptionurl = 'api/Description/DeleteDescription';
    readonly likeDescriptionurl = 'api/Description/LikeDescription';
    readonly baseUrl = 'api/Description';


    getDescription(): Observable<IJobDetails[]> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.baseUrl}`;
        return this.http.get(url, options)
            .map(this.extractData)
            .do(data => console.log('GetDescription: ' + JSON.stringify(data)))
            .catch(this.handleError);
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
        return this.http.get(url, options)
            .map(this.extractData)
            .do(data => console.log('GetDescription: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveDescription(description: IJobDetails): Observable<IJobDetails> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.saveDescriptionurl}`;

        return this.http.post(url, description, options)
            .map((p) => this.extractData(p))
            .do(data => console.log('saveDescription : ' + JSON.stringify(data)))
            .catch(this.handleError)

    }

    deleteDescription(description: string): Observable<IJobDetails> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.deleteDescriptionurl}/${description}`;
        return this.http.delete(url, options)
            .map((p) => this.extractData(p))
            .catch(this.handleError);
    }

    likeDescription(description: IJobDetails): Observable<IJobDetails> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.likeDescriptionurl}`;

        return this.http.post(url, description, options)
            .map((p) => this.extractData(p))
            .do(data => console.log('likeDescription : ' + JSON.stringify(data)))
            .catch(this.handleError)
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
            comments:[]
        };
    }
}
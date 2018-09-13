import { Component, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('userToken') });
        let options = new RequestOptions({ headers: headers });
        http.get(baseUrl + 'api/SampleData/WeatherForecasts', options).subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        }, error => console.error(error));
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

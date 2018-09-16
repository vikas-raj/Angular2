import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SearchInfoService } from '../shared/services/search.service';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent implements OnInit {
    constructor(/*http: Http, @Inject('BASE_URL') baseUrl: string*/private searchService: SearchInfoService) {

    }
    ngOnInit(): void {
        this.searchService.getDescription().subscribe((result) => {
            if (result) {

            }
        });
    }

   
}

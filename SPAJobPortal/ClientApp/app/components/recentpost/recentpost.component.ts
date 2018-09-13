import { Component } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { Description_Actions } from '../../store/description/description.action';
//import { Router } from "@angular/router/src";

@Component({
    selector: 'recent-post',
    templateUrl: './recentpost.component.html',
    styleUrls: ['./recentpost.component.css']
})
export class RecentpostComponent {
    public ActiveSearchId: number = 2;
    private sub: Subscription;
    constructor(private description_Actions: Description_Actions,private router: Router) {}

    ngOnInit(): void {

    }
    getDescription(id: string) {
        this.router.navigate(['/description', id]);
        //this.description_Actions.getDescription(id);
    }
}
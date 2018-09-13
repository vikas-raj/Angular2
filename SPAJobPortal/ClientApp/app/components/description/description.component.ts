import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { SearchInfoService } from "../shared/services/search.service";
import { Subscription, ISubscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { select } from "@angular-redux/store/lib/src";
import { IJobDetails } from "../shared/model/IJobDetails";
import { Description_Actions } from "../../store/description/description.action";

@Component({
    selector: 'description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
    private sub: Subscription;
    private description: IJobDetails;
    @select(['descriptionJobDetail']) readonly descriptionJobDetail$: Observable<IJobDetails>;
    private descriptionJobDetailSub: ISubscription;
    constructor(private route: ActivatedRoute, private searchInfoService: SearchInfoService,
        private router: Router, private description_Actions: Description_Actions) {

    }

    ngOnInit(): void {
        let asd = "";
        this.descriptionJobDetailSub = this.descriptionJobDetail$.subscribe(record => {
            if (record != undefined) {
                if (record.id != -1) {
                    this.description = record;
                } else if (record.id == -1) {
                    this.router.navigate(['not-found']);
                }
            }
        })
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id?'];
                this.description_Actions.getDescription(id);
            });
    }

    ngOnDestroy() {
        //this.sub.unsubscribe();

    }
}
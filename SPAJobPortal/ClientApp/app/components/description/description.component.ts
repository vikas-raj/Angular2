import { Component, Inject, ElementRef, ViewChild, Pipe } from '@angular/core';
import { Http } from '@angular/http';
import { SearchInfoService } from "../shared/services/search.service";
import { Subscription, ISubscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { select } from "@angular-redux/store/lib/src";
import { IJobDetails } from "../shared/model/IJobDetails";
import { Description_Actions } from "../../store/description/description.action";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
    private sub: Subscription;
    private description: IJobDetails;
    private likeCount: number = 0;
    private commentCount: number = 0;

    @select(['descriptionJobDetail']) readonly descriptionJobDetail$: Observable<IJobDetails>;

    private descriptionJobDetailSub: ISubscription;
    constructor(private route: ActivatedRoute, private searchInfoService: SearchInfoService,
        private router: Router, private description_Actions: Description_Actions) {

    }

    ngOnInit(): void {
        this.descriptionJobDetailSub = this.descriptionJobDetail$.subscribe(record => {
            if (record != undefined) {
                
                if (record.jobDetailId != -1 && record.jobDetailId != undefined) {
                    this.description = record;
                    this.likeCount = record.likes.filter(a => a.isActive == true).length;
                    this.commentCount = record.comments.filter(a => a.isActive == true).length;
                }
                else if (record.jobDetailId == undefined) {
                    this.likeCount = 0;
                    this.commentCount = 0;
                }else if (record.jobDetailId == -1) {
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

    onFocusComment() {
        this.description_Actions.descritionCommentFocus_True();
    }
}


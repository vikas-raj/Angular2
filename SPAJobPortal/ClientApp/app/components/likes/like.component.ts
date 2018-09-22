import { Component, Input, OnInit } from '@angular/core';
import { IJobDetails } from '../shared/model/IJobDetails';
import { SearchInfoService } from '../shared/services/search.service';
import { Description_Actions } from '../../store/description/description.action';

@Component({
    selector: 'app-likes',
    templateUrl: './like.component.html',
    styleUrls: ['./like.component.html']
})
export class LikesComponent implements OnInit {
    ngOnInit(): void {
    }
    constructor(private searchService: SearchInfoService, private description_Actions: Description_Actions) {

    }
    @Input() description: IJobDetails;
    ToggleLike() {
        this.description_Actions.likeDescription(this.description);
    }
}
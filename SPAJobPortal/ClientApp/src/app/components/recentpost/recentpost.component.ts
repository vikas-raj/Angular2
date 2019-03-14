import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Description_Actions } from '../../store/description/description.action';
import { SubscriptionLike } from 'rxjs';
//import { Router } from "@angular/router/src";

@Component({
  selector: 'recent-post',
  templateUrl: './recentpost.component.html',
  styleUrls: ['./recentpost.component.css']
})
export class RecentpostComponent {
  public ActiveSearchId: number = 2;
  private sub: SubscriptionLike;
  constructor(private description_Actions: Description_Actions, private router: Router) { }

  ngOnInit(): void {

  }
  getDescription(id: any) {
    this.router.navigate(['/description', id]);
    //this.description_Actions.getDescription(id);
  }
}

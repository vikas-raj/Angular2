import { Component } from '@angular/core';
import { App_Actions } from '../../store/app/app.actions';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private app_Action: App_Actions) {
    this.app_Action.appOnLoad()
  }
  onLogedIn() {
    return !!localStorage.getItem('userToken');
  }
}

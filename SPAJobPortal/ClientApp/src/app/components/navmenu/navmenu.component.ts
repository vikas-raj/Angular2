import { Component } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    onLogedIn() {
        return !!localStorage.getItem('userToken');
    }

    onLogOut() {
        localStorage.removeItem('userToken');
    }
}

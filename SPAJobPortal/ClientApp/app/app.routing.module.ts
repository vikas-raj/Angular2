import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CounterComponent } from "./components/counter/counter.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { DescriptionComponent } from "./components/description/description.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './components/shared/auth/auth.guard';

const appRoutes: Routes =
    [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard]  },
        { path: 'description/:id?', component: DescriptionComponent },
        { path: 'not-found', component: NotFoundComponent },
        {
            path: 'signup', component: UserComponent,
            children: [{ path: '', component: SignUpComponent }]
        },
        {
            path: 'login', component: UserComponent,
            children: [{ path: '', component: LoginComponent }]
        },
        //{ path: 'registration', component: SignUpComponent },
        //{ path: 'login', component: LoginComponent },
        { path: '**', redirectTo: 'not-found' }
    ];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
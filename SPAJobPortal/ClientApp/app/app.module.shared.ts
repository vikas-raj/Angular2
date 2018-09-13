import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StoreModule } from "./store/store.module";
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { DescriptionComponent } from './components/description/description.component';
import { RecentpostComponent } from './components/recentpost/recentpost.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchInfoService } from "./components/shared/services/search.service";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AppRoutingModule } from "./app.routing.module";
import { UserService } from './components/shared/services/user.service';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { LikesComponent } from './components/likes/like.component';
import { CommentsComponent } from './components/comments/comment.component';
import { AuthGuard } from './components/shared/auth/auth.guard';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        DescriptionComponent,
        RecentpostComponent,
        FooterComponent,
        HomeComponent,
        NotFoundComponent,
        UserComponent,
        SignUpComponent,
        LoginComponent,
        LikesComponent,
        CommentsComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        CommonModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        ModalModule.forRoot(),
        StoreModule
    ]
    ,
    providers: [
        SearchInfoService,
        UserService,
        AuthGuard
    ]
})

export class AppModuleShared {
}

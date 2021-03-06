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
import { NewJobRecordComponent } from './components/new-job/newJob.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { CommentComponent } from './components/comment/comment.component';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { QuillModule } from 'ngx-quill';
import { RichTextBoxComponent } from './components/rich-textbox/rich-textbox.component';
import { PagerService } from './components/shared/services/PagerService';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';


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
    CommentsComponent,
    NewJobRecordComponent,
    CommentComponent,
    RichTextBoxComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    StoreModule,
    AngularDateTimePickerModule,
    NguiDatetimePickerModule,
    QuillModule, NgSelectModule
  ]
  ,
  providers: [
    SearchInfoService,
    UserService,
    AuthGuard,
    PagerService
  ]
})

export class AppModuleShared {
}

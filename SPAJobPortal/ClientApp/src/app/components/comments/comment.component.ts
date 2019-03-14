import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-comments',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentsComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {

    }
    @ViewChild('commentPoUp') public commentPoUp: ElementRef;
    commentForm: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    private comment: string = "";

    ngOnInit(): void {
        this.commentForm = this.formBuilder.group({
            Comment: ['']
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }

        this.loading = true;
        //this.userService.loginUser(this.loginForm.value).subscribe((data: any) => {
        //    localStorage.setItem('userToken', data.tokenString);
        //    this.router.navigate(['/home']);
        //}, (error) => {
        //    console.log(error);
        //});
    }

    onPopUpOpen():void {
        this.renderer.removeStyle(this.commentPoUp.nativeElement, "display");
        this.renderer.addClass(this.commentPoUp.nativeElement, "popUp");
    }

    closePopUp(): void {
        this.renderer.removeClass(this.commentPoUp.nativeElement, "popUp");
        this.renderer.setStyle(this.commentPoUp.nativeElement, "display", "none");
    }
}
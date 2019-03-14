import { Component, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { select } from "@angular-redux/store/lib/src";
import { Observable } from 'rxjs';
import { Description_Actions } from '../../store/description/description.action';

@Component({
    templateUrl: './comment.component.html',
    selector: 'app-comment',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent {
    constructor(private formBuilder: FormBuilder, private description_Actions: Description_Actions) { }
    @ViewChild('inputComment') inputComment: ElementRef;

    commentForm: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;

    @select(['descritionCommentFocus']) readonly descritionCommentFocus$: Observable<boolean>;

    ngOnInit(): void {
        this.commentForm = this.formBuilder.group({
            Comment: ['']
        });

        this.descritionCommentFocus$.subscribe(
            result => {
                if (result) {
                    this.inputComment.nativeElement.focus();
                    this.description_Actions.descritionCommentFocus_False();
                }
            })
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }
    }
}
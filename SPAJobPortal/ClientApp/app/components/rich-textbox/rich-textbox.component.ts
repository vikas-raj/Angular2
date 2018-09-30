import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'rich-text-control',
    templateUrl: './rich-textbox.component.html',
    styleUrls: ['./rich-textbox.component.css']
})
export class RichTextBoxComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {

    }
    @ViewChild('commentPoUp') public commentPoUp: ElementRef;
    @Input() parentSource: string = "";
    @Input() parentValue: string = "";

    @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();

    commentForm: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    showHtml: boolean = false;
    private comment: string = "";
    private textFormat: string = "";
    ngOnInit(): void {
        this.commentForm = this.formBuilder.group({
            editor: [this.parentValue]
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }

        //this.loading = true;
        //this.userService.loginUser(this.loginForm.value).subscribe((data: any) => {
        //    localStorage.setItem('userToken', data.tokenString);
        //    this.router.navigate(['/home']);
        //}, (error) => {
        //    console.log(error);
        //});
        this.onAdd.emit({ value: this.commentForm.value.editor, source: this.parentSource });
        this.commentForm.reset();
        this.closePopUp();
    }

    onPopUpOpen(): void {
        this.renderer.removeStyle(this.commentPoUp.nativeElement, "display");
        this.renderer.addClass(this.commentPoUp.nativeElement, "popUp");
        this.commentForm.patchValue({
            editor: this.parentValue
        });
    }

    closePopUp(): void {
        this.renderer.removeClass(this.commentPoUp.nativeElement, "popUp");
        this.renderer.setStyle(this.commentPoUp.nativeElement, "display", "none");
    }
    resetForm() {
        this.commentForm.reset();
    }
    ngDoCheck() {
        if (this.commentForm) {
            let asd = this.commentForm.value.editor;
        }

    }
}
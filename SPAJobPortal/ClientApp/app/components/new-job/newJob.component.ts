import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchInfoService } from '../shared/services/search.service';

//import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { QuillModule } from 'ngx-quill';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

//import Quill from 'quill';



//// add mention module
//import 'quill-mention';

//// override p with div tag
//const Parchment = Quill.import('parchment');
//let Block = Parchment.query('block');

//Block.tagName = 'DIV';
//// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
//Quill.register(Block /* or NewBlock */, true);


//// Add fonts to whitelist
//var Font = Quill.import('formats/font');
//// We do not add Aref Ruqaa since it is the default
//Font.whitelist = ['mirza', 'aref', 'sans-serif', 'monospace', 'serif'];
//Quill.register(Font, true);

@Component({
    selector: 'app-new-job',
    templateUrl: './newJob.component.html',
    styleUrls: ['./newJob.component.css']
})
export class NewJobRecordComponent {
    newJobForm: FormGroup;
    @ViewChild('editor') editor: QuillEditorComponent;
    AboutTheCompany: string = "About The Company";
    InterViewVenue: string = "InterView Venue";
    EligibilityCriteria: string = "Eligibility Criteria";
    HowtoApply: string = "How to Apply";
    ImportantNotes: string = "Important Notes";
    ExperienceRequired: string = "Experience Required";
    date2 = new Date(2017, 0, 28);
    date2DisabledDates = [new Date(2017, 0, 10), new Date(2017, 0, 20)];
    date2MinDate = new Date();
    date2MaxDate = new Date(2017, 11, 31);
    date2New = new Date(2017, 11, 31);
    date: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MMM-yyyy hh:mm a',
        defaultOpen: false
    }
    constructor(private formBuilder: FormBuilder,
        private router: Router, private searchInfoService: SearchInfoService) {

    }

    ngOnInit() {
        this.newJobForm = this.formBuilder.group({           
            aboutTheCompany: [''],
            companyName: [''],
            companyWebsite: [''],
            jobLocation: [''],
            position: [''],
            salary: [''],
            interviewVenue: [''],
            eligibilityCriteria: [''],
            howToApply: [''],
            registrationLink: [''],
            importantNote: [''],
            eventDate: [''],
            lastDateToApply: [''],
            experienceRequired: ['']
        });
    }
    onDateSelect(event: any) {

    }
    onSubmit() {
        this.searchInfoService.saveDescription(this.newJobForm.value).subscribe((data: any) => {

        });
    }

    onAdd(event: any): void{
        switch (event.source) {
            case this.AboutTheCompany:
                this.newJobForm.patchValue({ aboutTheCompany: event.value });
                break;
            case this.InterViewVenue:
                this.newJobForm.patchValue({ interviewVenue: event.value });
                break;
            case this.EligibilityCriteria:
                this.newJobForm.patchValue({ eligibilityCriteria: event.value });
                break;
            case this.HowtoApply:
                this.newJobForm.patchValue({ howToApply: event.value });
                break;
            case this.ImportantNotes:
                this.newJobForm.patchValue({ importantNote: event.value });
                break;
            case this.ExperienceRequired:
                this.newJobForm.patchValue({ experienceRequired: event.value });
                break;
            default:
        }
        
        console.log(event);
    }
}
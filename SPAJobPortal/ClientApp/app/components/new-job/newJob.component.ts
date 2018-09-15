import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchInfoService } from '../shared/services/search.service';

@Component({
    selector: 'app-new-job',
    templateUrl: './newJob.component.html',
    styleUrls: ['./newJob.component.html']
})
export class NewJobRecordComponent {
    newJobForm: FormGroup;
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
            experienceRequired: [''],
        });
    }
    onDateSelect(event: any) {

    }
    onSubmit() {
        this.searchInfoService.saveDescription(this.newJobForm.value).subscribe((data: any) => {

        });
    }
}
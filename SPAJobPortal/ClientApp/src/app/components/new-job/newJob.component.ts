import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchInfoService } from '../shared/services/search.service';
import { distinctUntilChanged, debounceTime, filter, switchMap } from 'rxjs/operators';

//import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { QuillModule, QuillEditorComponent } from 'ngx-quill';
//import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { SubscriptionLike } from 'rxjs';

//import Quill from 'quill';

@Component({
  selector: 'app-new-job',
  templateUrl: './newJob.component.html',
  styleUrls: ['./newJob.component.css']
})
export class NewJobRecordComponent {
  newJobForm: FormGroup;
  @ViewChild('editor') editor: QuillEditorComponent;

  typeaheadKeySkills = new EventEmitter<string>();
  SubscriptionTypeaheadKeySkills: SubscriptionLike;
  dropdownListForKeySkills: any[] = [];

  selectedKeySkills: any[] = [];
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
  loading: boolean = false;
  submitted: boolean = false;
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
      keySkills: []
    });

    this.SubscriptionTypeaheadKeySkills = this.typeaheadKeySkills.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      filter((skill: string) => skill != null && skill.length > 2),
      switchMap(search => this.searchInfoService.getKeySkills(search)))
      .subscribe(items => {
        this.dropdownListForKeySkills = items;
      },
        (err) => {
        })
  }

  onItemSelect(item: any) {

  }

  onDateSelect(event: any): void {

  }
  onSubmit() {
    this.submitted = true;
    this.searchInfoService.saveDescription(this.newJobForm.value).subscribe((data: any) => {

    });
  }

  onAdd(event: any): void {
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

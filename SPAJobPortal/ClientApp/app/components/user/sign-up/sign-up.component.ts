import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/model/IUser';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { IFileUpload } from '../../shared/model/IFileUpload';
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    public user: User;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    fileUploads: IFileUpload[] = [];
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Email: ['', Validators.required],
            fileUpload: [[], Validators.required],
            UserName: ['', Validators.required],            
            Password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        let user = <User>{};
        user.Email = this.registerForm.value.asd;
        user.FirstName = this.registerForm.value.asd;
        user.LastName = this.registerForm.value.asd;
        user.UserName = this.registerForm.value.asd;
        user.Password = this.registerForm.value.asd;
        user.ProfilePicture = this.fileUploads[0];
        this.userService.registerUser(user)
            .subscribe((data: any) => {
                if (data.Succeeded == true) {

                }
                else {
                    let asd = "error occured";
                }
            });
    }



    fileChange(event: any) {
        let reader = new FileReader();
        let filesToUpload: IFileUpload[] = [];
        var file;
        if (event.target && event.target.files && event.target.files.length == 1) {
            for (let i = 0; i < event.target.files.length; i++) {
                file = event.target.files[i];
                let fileUpload: IFileUpload = { fileName: file.name, fileType: "", fileValue: [] };

                reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e: any) {
                        fileUpload.fileValue = e.target.result.split(',')[1];
                        fileUpload.fileType = e.target.result.split(',')[0];
                    };
                })(file);

                if (this.fileUploads.length == 0 && filesToUpload.length == 0) {
                    filesToUpload.push(fileUpload);
                } else {
                    alert("Only single photo allowed");
                }

                reader.readAsDataURL(file);
            }
        }
        else {
            alert("Only single photo allowed");
        }

        this.fileUploads = [...this.fileUploads, ...filesToUpload];
    }

    multileFileChange(event: any) {
        let reader = new FileReader();
        let filesToUpload: IFileUpload[] = [];
        var file;
        if (event.target && event.target.files && event.target.files.length > 0) {
            for (let i = 0; i < event.target.files.length; i++) {
                file = event.target.files[i];
                let fileUpload: IFileUpload = { fileName: file.name, fileType: "", fileValue: [] };

                reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e:any) {
                        fileUpload.fileValue = e.target.result.split(',')[1];
                        fileUpload.fileType = e.target.result.split(',')[0];
                    };
                })(file);

                if (this.fileUploads.filter(file => file.fileName == fileUpload.fileName).length == 0 && filesToUpload.filter(file => file.fileName == fileUpload.fileName).length == 0) {
                    filesToUpload.push(fileUpload);
                }

                reader.readAsDataURL(file);
            }
        }

        this.fileUploads = [...this.fileUploads, ...filesToUpload];
    }
}
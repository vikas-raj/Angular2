import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../shared/model/IUser';
import { error } from 'protractor';


@Component({
    templateUrl: './login.component.html',
    selector: 'app-login',
    styleUrls:['./login.component.css']
})
export class LoginComponent {
    public user: User;
    loginForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({            
            UserName: ['', Validators.required],
            Password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        console.log(this.router.url);
        
        this.loading = true;
        let _self = this;
        this.userService.loginUser(this.loginForm.value).subscribe((data: any) => {
            localStorage.setItem('userToken', data.tokenString);
            if (this.router.url.indexOf('returnUrl') > 1) {
                this.router.navigate(['/' + this.router.url.split('%2F')[1] + '']);
            } else {
                this.router.navigate(['/home']);
            }
            
        }, (error) => {
            console.log(error);
            });
    }
}
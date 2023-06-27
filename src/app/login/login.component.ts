import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees/employees.service';
import { use } from 'chai';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    loginForm: FormGroup = {} as FormGroup;;
    constructor(private formBuilder: FormBuilder, private employeeService: EmployeesService, private router: Router) { }
    showPassword: boolean = false;
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        let user = this.loginForm.value;
        if (this.loginForm.invalid) {
            console.log(user)
            return;
        }
        else {
            this.employeeService.login(user).subscribe((data: any) => {
                console.log('login Response');
                console.log(data);

                if (data.data.token) {
                    localStorage.setItem("name", data.data.name);
                    localStorage.setItem("token", data.data.token);
                    this.router.navigate(['/employees']);
                }
                else {
                    alert('Invalid Credentials');
                }
            });
        }
        // Perform signup logic here, e.g., send data to server
        //console.log(this.loginForm.value);
    }
    navigateToSignUp() {
        this.router.navigate(['/signup']);
    }
    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}

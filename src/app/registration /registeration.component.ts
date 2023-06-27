import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees/employees.service';

@Component({
    selector: 'app-registeration',
    templateUrl: './registeration.component.html',
})
export class RegisterationComponent {
    signupForm: FormGroup = {} as FormGroup;
    isFormSubmitted: boolean = false;
    constructor(private formBuilder: FormBuilder, private employeeService: EmployeesService, private router: Router) { }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }
    get f() {
        return this.signupForm.controls;
    }
    onSubmit() {
        let user = this.signupForm.value;
        this.isFormSubmitted = true;
        if (this.signupForm.invalid) {
            return;
        }
        else {
            this.employeeService.signUp(user).subscribe((data: any) => {
                let response = data;
                console.log('Signup Response');
                console.log(response);
                if (data?.data?.token) {
                    localStorage.setItem("name", data.data.name);
                    localStorage.setItem("token", data.data.token);
                    this.router.navigate(['/employees']);
                }
                else {
                    alert('User already Exist.')
                }
            });
        }
        // Perform signup logic here, e.g., send data to server
        console.log(this.signupForm.value);
    }
    navigateToLogin() {
        this.router.navigate(['login']);
    }
}

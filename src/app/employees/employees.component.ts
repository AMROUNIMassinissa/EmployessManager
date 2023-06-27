import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { EmployeesService } from './employees.service';
import { Employee } from './schema/employees';
import { FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    providers: [EmployeesService]
})


export class EmployeesComponent {
    employees: Employee[] = [];
    employee: Employee = new Employee;
    _id: string = '';
    nom: string = '';
    prenom: string = '';
    poste: string = '';
    email: string = '';
    num: string = '';
    sexe: string = '';
    address: string = '';
    pays: string = '';
    codepos: string = '';
    salaire: string = '';
    fieldsetDisabled: boolean = false;
    isSaveVisible: boolean = true;
    loggedUser: any = "";
    myForm !: FormGroup;
    isEmployeeAdded = false;
    searchKeyword: string = '';
    filteredEmployees: Employee[] = [];
    keyword: string = ''

    constructor(private employeeService: EmployeesService, private router: Router) {
        this.loggedUser = localStorage.getItem("name");
    }





    ngOnInit() {
        //this.employeeService.getEmployees().subscribe((employees:Employee[])=>{this.employees=employees});
        this.viewEmployees();
        this.loggedUser = localStorage.getItem("name");

    }
    viewEmployees() {
        this.employeeService.getEmployees().subscribe({
            next: (data: any) => {
                this.employees = data;
                console.log(data);
            },
            error: (e) => console.error(e)
        });
    }


    viewEmployee(id: any) {
        //var employees=this.employees;
        this.employeeService.viewEmployee(id).subscribe({
            next: (data: any) => {
                this.employee = data;
                this._id = this.employee._id;
                this.nom = this.employee.nom;
                this.prenom = this.employee.prenom;
                this.poste = this.employee.poste;
                this.email = this.employee.email;
                this.sexe = this.employee.sexe;
                this.num = this.employee.num;
                this.address = this.employee.address;
                this.pays = this.employee.pays;
                this.codepos = this.employee.codepos;
                this.salaire = this.employee.salaire;
            }
        })
    }


    addeditEmployee(addoredit: any) {
        const newEmployee = {
            nom: this.nom,
            prenom: this.prenom,
            poste: this.poste,
            sexe: this.sexe,
            email: this.email,
            num: this.num,
            address: this.address,
            pays: this.pays,
            codepos: this.codepos,
            salaire: this.salaire

        }
        if (this._id == '') {
            //this.employeeService.addEmployee(newEmployee).subscribe(({employee})=>{this.employees.push(employee);})
            this.employeeService.addEmployee(newEmployee).subscribe((data: any) => {
                console.log('employee registe Response');
                console.log(data);
                alert('Employee added');
            });
        }
        else {
            this.employeeService.updateEmployee(this._id, newEmployee).subscribe(data => alert('Employee updated'));
        }

    }


    deleteEmployee(id: any) {
        var employees = this.employees;
        //console.log("am here")
        this.employeeService.deleteEmployee(id).subscribe(data => {
            // if(data.n==1){
            for (var i = 0; i < employees.length; i++) {
                if (employees[i]._id == id) {

                    employees.splice(i, 1);
                }
                // }
            }
        })
    }




    reloadpage() {
        window.location.reload();
    }

    disableFields() {
        this.fieldsetDisabled = true;
    }

    enableFields() {
        this.fieldsetDisabled = false;
    }
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        this.router.navigate(['/login']);
    }
}

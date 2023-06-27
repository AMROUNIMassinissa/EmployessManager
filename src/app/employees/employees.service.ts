import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Employee } from './schema/employees';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    baseUrl: string = 'http://localhost:4000/api';
    token: any = '';
    constructor(private http: HttpClient) {
    }
    //retreiving employees
    getEmployees() {
        this.token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*', 'Authorization': `Bearer ${this.token}`
        });
        let options = { headers: headers };

        return this.http.get(this.baseUrl + '/employees', options).pipe(map(res => res));
    }

    addEmployee(newEmployee: any) {
        console.log(this.token = localStorage.getItem("token"))
        this.token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*', 'Authorization': `Bearer ${this.token}`
        });
        let options = { headers: headers };

        return this.http.post(this.baseUrl + '/add', newEmployee, options).pipe(map(res => res));
    }
    deleteEmployee(id: any) {
        this.token = localStorage.getItem("token");
        console.log(id)
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*', 'Authorization': `Bearer ${this.token}`
        });
        let options = { headers: headers };
        return this.http.delete(this.baseUrl + '/delete/' + id, options).pipe(map(res => res));
    }

    viewEmployee(id: any) {
        this.token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*', 'Authorization': `Bearer ${this.token}`
        });
        let options = { headers: headers };
        return this.http.get(this.baseUrl + '/viewemployee/' + id, options).pipe(map(res => res));
    }

    updateEmployee(id: any, newEmployee: any) {
        this.token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*', 'Authorization': `Bearer ${this.token}`
        });
        let options = { headers: headers };
        return this.http.post(this.baseUrl + '/update/' + id, newEmployee, options).pipe(map(res => res));
    }
    signUp(user: any) {
        var headers = new HttpHeaders();
        //const headers = new HttpHeaders().set('Content-Type', 'application/json')
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.baseUrl + '/signup', user, { headers: headers }).pipe(map(res => res));
    }
    login(user: any) {
        var headers = new HttpHeaders();
        //const headers = new HttpHeaders().set('Content-Type', 'application/json')
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.baseUrl + '/login', user, { headers: headers }).pipe(map(res => res));
    }


}



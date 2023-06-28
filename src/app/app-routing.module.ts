import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registration /registeration.component';
const routes: Routes = [
  { path: '', component: LoginComponent },


  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterationComponent },
  { path: 'employees', component: EmployeesComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

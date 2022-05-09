import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component'
import { LoginComponent } from './login/login.component'
import  { DashboardComponent } from './dashboard/dashboard.component'

import { CustomerMasterAddComponent } from './sales/customer/customer-master-add/customer-master-add.component';
import { CustomerMasterListComponent } from './sales/customer/customer-master-list/customer-master-list.component';
import { AddLoanComponent } from './loan/add-loan/add-loan.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { LoadOfficerAddComponent } from './loan-officer/loan-officer-add/loan-officer-add.component';
import { PaymentComponent } from './loan/payment/payment.component';

const routes: Routes = [
  { path: 'navigation', component: NavigationComponent},
  {path: 'login', component: LoginComponent },
  {path: 'home', component: DashboardComponent },
  

  {path: 'customer-master-add', component: CustomerMasterAddComponent },
  {path: 'customer-master-edit/:id', component: CustomerMasterAddComponent },
  {path: 'customer-master-list', component: CustomerMasterListComponent },
  {path: 'add-loan', component: AddLoanComponent},
  {path: 'add-loan/:id', component: AddLoanComponent},
  {path: 'loan-list', component: LoanListComponent},
  {path: 'loan-officer-add', component: LoadOfficerAddComponent },
  {path: 'payment', component: PaymentComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

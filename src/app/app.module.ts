import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/authentication/auth-interceptor.service'
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 
import { MatToolbarModule} from '@angular/material/toolbar'; 
import { MatSidenavModule} from '@angular/material/sidenav'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule }  from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularResizeEventModule } from 'angular-resize-event';
import { CustomerMasterAddComponent } from './sales/customer/customer-master-add/customer-master-add.component';
import { CustomerMasterListComponent } from './sales/customer/customer-master-list/customer-master-list.component';
import { AddLoanComponent } from './loan/add-loan/add-loan.component';
import { DialogAddLoanComponent } from './loan/add-loan/dialog-addloan/dialog-addloan.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { LoadOfficerAddComponent } from './loan-officer/loan-officer-add/loan-officer-add.component';
import { LoanOfficerAddDialogComponent } from './loan-officer/loan-officer-add-dialog/loan-officer-add-dialog.component';
import { PaymentComponent } from './loan/payment/payment.component';
import { DialogPaymentComponent } from './loan/payment/dialog-payment/dialog-payment.component';
import {DialogNoteComponent} from './dashboard/dialognote/dialognote.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    CustomerMasterAddComponent,
    CustomerMasterListComponent,
    AddLoanComponent,
    DialogAddLoanComponent,
    LoanListComponent,
    LoadOfficerAddComponent,
    LoanOfficerAddDialogComponent,
    PaymentComponent,
    DialogPaymentComponent,
    DialogNoteComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    MatRippleModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTreeModule,
    MatTreeModule,
    MatCheckboxModule,
    MatSortModule,
    FormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDialogModule,
    ToastrModule.forRoot({ preventDuplicates: true,}),
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatRadioModule,
    MatFormFieldModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    AngularResizeEventModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      
    },
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

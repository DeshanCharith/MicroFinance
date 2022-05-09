import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {LoanService } from 'src/app/services/loan.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog } from '@angular/material/dialog';
import { DialogPaymentComponent} from './dialog-payment/dialog-payment.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  displayedColumns: string[] = ['id','loan_id' ,'cus_id', 'cus_name', 'payment', 'remain','date','current_user','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  errors: any;
  frmmodel_edit: any={};
  loan_data: any=[];
  show_ping: boolean;
  lable_change1: string;
  lable_change2: string;
  remain_org: any;
  frmodel_delete: any={};
  
  constructor(private LoanService:LoanService, private toastr: ToastrService,public dialog: MatDialog,private router: Router,private Activeroute: ActivatedRoute) { }

  end_date: Date;
  date: Date;
  edit_res: any[];

  ngOnInit(): void {

  this.GetPaymentDetails();
  this.lable_change1="Loan Amount";
  this.lable_change2="Rental";
  }

  GetPaymentDetails(){
    this.LoanService.get_payment_details().then(res=>this.dataSource.data = res as any[]);
    console.log(this.dataSource.data); 
  }

  EditPaymentData(id,loan_id,cus_id,cus_name,remain,payment,date){
    this.frmmodel.id=id;
    this.frmmodel.loan_id=loan_id;
    this.frmmodel.fullname=cus_name;
    this.frmmodel.nic_no=cus_id;
    this.frmmodel.amount=cus_id;
    this.frmmodel.payment=payment;
    this.frmmodel.remain=remain;
    this.remain_org=remain+payment;
    this.frmmodel.rental=date;
    this.lable_change1="Customer NIC";
    this.lable_change2="Paid date";
  }


  async DeletePayment(id){
    console.log(id);
    this.frmodel_delete.id=id;
    console.log(this.frmodel_delete.id);
    await this.LoanService.delete_payment_rec(this.frmodel_delete).subscribe(
      result => {
        this.toastr.success("Success",'Delete Payment ID'+ this.frmodel_delete.id);
  
      },
      error => {
        this.errors = error.error;
        var error_key;
        for(let key in error.error){
          error_key = key;break;
        }
      
         this.toastr.error(this.errors?.[error_key],'Delete Payment');
  
      },() => {
       
        
      }
    );
    this.GetPaymentDetails();
  }

  onChangePayment(event){
    var remain_org: number = +this.remain_org ;
    this.frmmodel.remain=remain_org-event;
  }


 frmmodel :any={};
// async Edit_Loan(){
//   console.log(this.frmmodel_edit);
//   await this.LoanService.edit_loan(this.frmmodel_edit).subscribe(
//     result => {
//       this.edit_res=result as any[];

//       this.frmmodel.amount=this.edit_res[0].amount;
//       this.frmmodel.nic_no=this.edit_res[0].nic_no;
//       this.frmmodel.fullname=this.edit_res[0].fullname;
//       this.frmmodel.address=this.edit_res[0].address;
//       this.frmmodel.route=this.edit_res[0].route;
//       this.frmmodel.mobile_no=this.edit_res[0].mobile_no;
//       this.frmmodel.interest=this.edit_res[0].interest;
//       this.frmmodel.guarantor_details=this.edit_res[0].guarantor_details;
//       this.frmmodel.steps=this.edit_res[0].steps;
//       this.frmmodel.loanofficer=this.edit_res[0].loanofficer;
//       this.frmmodel.rental=this.edit_res[0].rental;
//       this.frmmodel.start_date=this.edit_res[0].start_date;
//       this.frmmodel.end_date=this.edit_res[0].end_date;
//       this.frmmodel.doc_charges=this.edit_res[0].doc_charges;
//       this.frmmodel.loanofficer=this.edit_res[0].loanofficer;
//       this.frmmodel.penalty=this.edit_res[0].penalty;
//       this.frmmodel.penalty_intr=this.edit_res[0].penalty_intr;
//       this.frmmodel.due_interest=this.edit_res[0].due_interest;
//       this.frmmodel.payment_plan=this.edit_res[0].payment_plan;
 
//     },
//     error => {
//       this.errors = error.error;
//       var error_key;
//       for(let key in error.error){
//         error_key = key;break;
//       }
       
//     },() => {  
//     }
//   );
// }


// RentalCalculate()
// { 
//   var amount: number = +this.frmmodel.amount ;
//   var interest: number = +this.frmmodel.interest;
//   var steps: number = +this.frmmodel.steps;
  
  
  
//   if(this.frmmodel.payment_plan == "Daily")
//   {
//     this.frmmodel.rental = ((((((amount * (interest/100)))/30)*steps) + amount) / steps);
//     this.frmmodel.rental=Number(this.frmmodel.rental).toFixed(0);
//   }

//   else if(this.frmmodel.payment_plan == "Weekly")
//   {   
//     this.frmmodel.rental = ((((((amount * (interest/100)))/4)*steps) + amount) / steps);  
//     this.frmmodel.rental=Number(this.frmmodel.rental).toFixed(0);
//   }

//   else
//   {   
//     this.frmmodel.rental = (((((amount * (interest/100)))*steps) + amount) / steps); 
//     this.frmmodel.rental=Number(this.frmmodel.rental).toFixed(0); 
//   }

//   if(isNaN(this.frmmodel.rental))
//   {this.frmmodel.rental="0.0";
//   }

// }

// onChangePaymentPlane(event){
//   this.RentalCalculate();
//   if(event == "Daily")
//   {
//     this.frmmodel.steps_label = "Days";
//     this.DateCalculator(this.date);
//   }

//   else if(event == "Weekly")
//   {
//     this.frmmodel.steps_label = "Weeks";
//     this.DateCalculator(this.date);
//   }

//   else if(event == "Monthly")
//   {
//   this.frmmodel.steps_label = "Months";
//   this.DateCalculator(this.date);
//   }
// }

// onChangeAmount(event){
//   this.RentalCalculate();
// }

// onChangeInterest(event){
//   this.RentalCalculate();
// }

// onChangeSteps(event){
//   this.RentalCalculate();
//   this.date = new Date();
//   this.DateCalculator(this.date);
  
//   this.frmmodel.start_date=this.date;

// }

// DateCalculator(event){

//   if(this.frmmodel.payment_plan == "Daily")
//   {
//     var steps: number = +this.frmmodel.steps;
//     this.date = new Date();
//     this.end_date = new Date();
//     this.date = event;
//     this.end_date.setDate( this.date.getDate() + steps);
//     this.frmmodel.end_date = new DatePipe('en-US').transform(this.end_date, 'yyyy-MM-dd');
    
//   }

//   else if(this.frmmodel.payment_plan == "Weekly")
//   {   
//     var steps: number = +this.frmmodel.steps;
//     steps = (steps*7);
//     this.date = new Date();
//     this.end_date = new Date();
//     this.date = event;
//     this.end_date.setDate( this.date.getDate() + steps);
//     this.frmmodel.end_date = new DatePipe('en-US').transform(this.end_date, 'yyyy-MM-dd');  
//   }

//   else
//   {   
//     var steps: number = +this.frmmodel.steps;
//     steps = (steps*30);
//     this.date = new Date();
//     this.end_date = new Date();
//     this.date = event;
//     this.end_date.setDate( this.date.getDate() + steps);
//     this.frmmodel.end_date = new DatePipe('en-US').transform(this.end_date, 'yyyy-MM-dd');  
//   }
 

// }

async AddNewLoan(){

  //this.frmmodel.loan_no = 1245;
 // this.frmmodel.start_date = new DatePipe('en-US').transform(this.frmmodel.start_date, 'yyyy-MM-dd');
  console.log(this.frmmodel);
  await this.LoanService.add_payment(this.frmmodel).subscribe(
    result => {
      this.toastr.success("Successfully pay..!",'Payment');
      this.GetPaymentDetails();
    
    },
    error => {
      this.errors = error.error;
      var error_key;
      for(let key in error.error){
        error_key = key;break;
      }
       this.toastr.error(this.errors?.[error_key],'Payment');

  
    },() => {
     
      
    }
  );
  
   
}


// public cutomer_add() {
//   this.frmmodel.fullname = DialogAddLoanComponent.name;
  
// }

openDialog(): void {
    
  //arry=item;
  const dialogRef = this.dialog.open(DialogPaymentComponent, {
  width: '90%',
   // data:arry,
    
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.frmmodel.id=null;
    this.frmmodel.loan_id=DialogPaymentComponent.id_p;
    this.frmmodel.fullname=DialogPaymentComponent.name_p;
    this.frmmodel.nic_no=DialogPaymentComponent.nic_no_p;
    this.frmmodel.amount=DialogPaymentComponent.amount_p;
    this.frmmodel.rental=DialogPaymentComponent.rental_p;
    this.frmmodel.remain=(DialogPaymentComponent.remain_p - DialogPaymentComponent.rental_p);
    this.remain_org=DialogPaymentComponent.remain_p;
    this.frmmodel.payment=DialogPaymentComponent.payment_p;

    this.lable_change1="Loan Amount";
    this.lable_change2="Rental";
    
  });
}


btnbackclick()
{  
  if(DashboardComponent.back_btn_to_dashboard == true){
  this.router.navigate(['home'], { replaceUrl: true });
   }
  else
  this.router.navigate(['loan-list'], { replaceUrl: true });
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}

export interface PeriodicElement {
  id: string;
  loan_id: string;
  cus_id:string;
  cus_name: string;
  payment: string;
  payment_plan: string;
  remain: string;
  date: string;
  current_user: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [];

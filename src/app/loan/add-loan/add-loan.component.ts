import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {LoanService } from 'src/app/services/loan.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog } from '@angular/material/dialog';
import { DialogAddLoanComponent } from './dialog-addloan/dialog-addloan.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss']
})
export class AddLoanComponent implements OnInit {
  errors: any;
  frmodel_delete: any;
  frmmodel_edit: any={};
  loan_data: any=[];
  
  constructor(private LoanService:LoanService, private toastr: ToastrService,public dialog: MatDialog,private router: Router,private Activeroute: ActivatedRoute) { }

  end_date: Date;
  date: Date;
  edit_res: any[];

  ngOnInit(): void {

  this.onChangePaymentPlane(event);
  this.frmmodel.steps_label="Days";
  this.frmmodel.payment_plan="Daily";
  this.frmmodel_edit.loan_id=this.Activeroute.snapshot.paramMap.get('id'); 
  this.Edit_Loan();


  }


frmmodel :any={};
async Edit_Loan(){
  console.log(this.frmmodel_edit);
  await this.LoanService.edit_loan(this.frmmodel_edit).subscribe(
    result => {
      this.edit_res=result as any[];

      this.frmmodel.amount=this.edit_res[0].amount;
      this.frmmodel.nic_no=this.edit_res[0].nic_no;
      this.frmmodel.fullname=this.edit_res[0].fullname;
      this.frmmodel.address=this.edit_res[0].address;
      this.frmmodel.route=this.edit_res[0].route;
      this.frmmodel.mobile_no=this.edit_res[0].mobile_no;
      this.frmmodel.interest=this.edit_res[0].interest;
      this.frmmodel.remain=this.edit_res[0].remain;
      this.frmmodel.guarantor_details=this.edit_res[0].guarantor_details;
      this.frmmodel.steps=this.edit_res[0].steps;
      this.frmmodel.loanofficer=this.edit_res[0].loanofficer;
      this.frmmodel.rental=this.edit_res[0].rental;
      this.frmmodel.start_date=this.edit_res[0].start_date;
      this.frmmodel.end_date=this.edit_res[0].end_date;
      this.frmmodel.doc_charges=this.edit_res[0].doc_charges;
      this.frmmodel.loanofficer=this.edit_res[0].loanofficer;
      this.frmmodel.penalty=this.edit_res[0].penalty;
      this.frmmodel.penalty_intr=this.edit_res[0].penalty_intr;
      this.frmmodel.due_interest=this.edit_res[0].due_interest;
      this.frmmodel.payment_plan=this.edit_res[0].payment_plan;
 
    },
    error => {
      this.errors = error.error;
      var error_key;
      for(let key in error.error){
        error_key = key;break;
      }
       
    },() => {  
    }
  );
}


RentalCalculate()
{ 
  var amount: number = +this.frmmodel.amount ;
  var interest: number = +this.frmmodel.interest;
  var steps: number = +this.frmmodel.steps;
  
  
  
  if(this.frmmodel.payment_plan == "Daily")
  {
    this.frmmodel.rental = ((((((amount * (interest/100)))/30)*steps) + amount) / steps);
    this.frmmodel.rental=Number(this.frmmodel.rental).toFixed(0);
  }

  else if(this.frmmodel.payment_plan == "Weekly")
  {   
    this.frmmodel.rental = ((((((amount * (interest/100)))/4)*steps) + amount) / steps);  
    this.frmmodel.rental=Number(this.frmmodel.rental).toFixed(0);
  }

  else
  {   
    this.frmmodel.rental = (((((amount * (interest/100)))*steps) + amount) / steps); 
    this.frmmodel.rental=Number(this.frmmodel.rental).toFixed(0); 
  }

  if(isNaN(this.frmmodel.rental))
  {this.frmmodel.rental="0.0";
  }

}

onChangePaymentPlane(event){
  this.RentalCalculate();
  if(event == "Daily")
  {
    this.frmmodel.steps_label = "Days";
    this.DateCalculator(this.date);
  }

  else if(event == "Weekly")
  {
    this.frmmodel.steps_label = "Weeks";
    this.DateCalculator(this.date);
  }

  else if(event == "Monthly")
  {
  this.frmmodel.steps_label = "Months";
  this.DateCalculator(this.date);
  }
}

onChangeAmount(event){
  this.RentalCalculate();
}

onChangeInterest(event){
  this.RentalCalculate();
}

onChangeSteps(event){
  this.RentalCalculate();
  this.date = new Date();
  this.DateCalculator(this.date);
  
  this.frmmodel.start_date=this.date;

}

DateCalculator(event){

  if(this.frmmodel.payment_plan == "Daily")
  {
    var steps: number = +this.frmmodel.steps;
    this.date = new Date();
    this.end_date = new Date();
    this.date = event;
    this.end_date.setDate( this.date.getDate() + steps);
    this.frmmodel.end_date = new DatePipe('en-US').transform(this.end_date, 'yyyy-MM-dd');
    
  }

  else if(this.frmmodel.payment_plan == "Weekly")
  {   
    var steps: number = +this.frmmodel.steps;
    steps = (steps*7);
    this.date = new Date();
    this.end_date = new Date();
    this.date = event;
    this.end_date.setDate( this.date.getDate() + steps);
    this.frmmodel.end_date = new DatePipe('en-US').transform(this.end_date, 'yyyy-MM-dd');  
  }

  else
  {   
    var steps: number = +this.frmmodel.steps;
    steps = (steps*30);
    this.date = new Date();
    this.end_date = new Date();
    this.date = event;
    this.end_date.setDate( this.date.getDate() + steps);
    this.frmmodel.end_date = new DatePipe('en-US').transform(this.end_date, 'yyyy-MM-dd');  
  }
 

}

async AddNewLoan(){

  this.frmmodel.loan_no = 1245;
  this.frmmodel.start_date = new DatePipe('en-US').transform(this.frmmodel.start_date, 'yyyy-MM-dd');
  console.log(this.frmmodel);
  await this.LoanService.add_loan(this.frmmodel).subscribe(
    result => {
      this.toastr.success("Successfully save a new laon",'Add loan');
    
    },
    error => {
      this.errors = error.error;
      var error_key;
      for(let key in error.error){
        error_key = key;break;
      }
       this.toastr.error(this.errors?.[error_key],'Add loan');

  
    },() => {
     
      
    }
  );
  
   
}


// public cutomer_add() {
//   this.frmmodel.fullname = DialogAddLoanComponent.name;
  
// }

openDialog(): void {
    
  //arry=item;
  const dialogRef = this.dialog.open(DialogAddLoanComponent, {
  width: '90%',
   // data:arry,
    
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.frmmodel.id=DialogAddLoanComponent.id_p;
    this.frmmodel.fullname=DialogAddLoanComponent.name_p;
    this.frmmodel.nic_no=DialogAddLoanComponent.nic_p;
    this.frmmodel.mobile_no=DialogAddLoanComponent.mobile_p;
    this.frmmodel.address=DialogAddLoanComponent.address_p;
    
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

}

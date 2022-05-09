import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LoanService} from 'src/app/services/loan.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  displayedColumns: string[] = ['id','amount' ,'rental', 'interest','remain', 'payment_plan','steps','start_date','end_date','fullname','nic_no','address','mobile_no','guarantor_details','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  result: any=[];
  errors: any;
  frmodel_delete: any={};

  constructor(private router: Router,private LoanService:LoanService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetLoanDetails();
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



  GetLoanDetails(){
    this.LoanService.get_loan_details().then(res=>this.dataSource.data = res as any[]);
    console.log(this.dataSource.data); 
  }

  async DeleteLoan(id){
    console.log(id);
    this.frmodel_delete.id=id;
    console.log(this.frmodel_delete.id);
    await this.LoanService.delete_loan(this.frmodel_delete).subscribe(
      result => {
        this.toastr.success("Success",'Delete Loan ID'+ this.frmodel_delete.id);
  
      },
      error => {
        this.errors = error.error;
        var error_key;
        for(let key in error.error){
          error_key = key;break;
        }
      
         this.toastr.error(this.errors?.[error_key],'Delete Loan');
  
      },() => {
       
        
      }
    );
    this.GetLoanDetails();
  }

 AddLoan(){
    this.router.navigate(['add-loan'], { replaceUrl: true });
  }

  async edit_loan_data(loan_id){
    // localStorage.setItem('status_back','service-list');
    // this.router.navigate(['add-loan'], { replaceUrl: true });
    this.router.navigate(['add-loan/'+loan_id], { replaceUrl: true });
    console.log(loan_id);
  //  this.host_status_data = [];
    //await this.hostservice.get_host_status_data(host_name).then(res=>this.host_status_data = res as any[]);
  }
}

export interface PeriodicElement {
  id: string;
  amount: string;
  rental: string;
  interest: string;
  remain: string;
  payment_plan: string;
  steps: string;
  start_date: string;
  end_date: string;
  fullname: string;
  nic_no: string;
  address: string;
  mobile_no: string;
  guarantor_details: string;
 


}

const ELEMENT_DATA: PeriodicElement[] = [];


function sd(sd: any) {
throw new Error('Function not implemented.');
}




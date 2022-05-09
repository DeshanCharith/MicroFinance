import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LoanService } from 'src/app/services/loan.service';


export interface DialogData {
 
}
@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss']
})
export class DialogPaymentComponent implements OnInit {

  displayedColumns: string[] = ['id','amount' ,'rental', 'remain', 'interest', 'payment_plan','steps','start_date','end_date','fullname','nic_no','address','mobile_no','guarantor_details','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  result: any=[];
  public static id_p: any;
  public static name_p: any;
  // public static nic_p: any;
  // public static mobile_p: any;
  // public static address_p: any;
  static rental_p: any;
  static fullname_p: any;
  static remain_p: any;
  static amount_p: any;
  static payment_p: any;
  static nic_no_p: any;

  constructor(private LoanService:LoanService,private dialogRefAll: MatDialog,
    public dialogRef: MatDialogRef<DialogPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     // this.all_value_group=data;

    }

  ngOnInit(): void {
    this.GetLoanDetails();
  }


  GetLoanDetails(){
    this.LoanService.get_loan_details().then(res=>this.dataSource.data = res as any[]);
    console.log(this.dataSource.data); 
  }

  SelectCustomer(id,name,amount,rental,nic_no,remain){
    DialogPaymentComponent.id_p = id;
    DialogPaymentComponent.name_p = name;
    DialogPaymentComponent.nic_no_p = nic_no;
    DialogPaymentComponent.amount_p = amount;
    DialogPaymentComponent.rental_p = rental;
    DialogPaymentComponent.remain_p = remain;
    DialogPaymentComponent.payment_p = rental;
     this.dialogRefAll.closeAll();
     
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface PeriodicElement {
  id: string;
  amount: string;
  remain:string;
  rental: string;
  interest: string;
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

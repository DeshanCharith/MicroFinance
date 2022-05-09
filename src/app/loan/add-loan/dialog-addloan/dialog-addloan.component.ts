import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LoanService } from 'src/app/services/loan.service';


export interface DialogData {
 
}
@Component({
  selector: 'app-dialog-addloan',
  templateUrl: './dialog-addloan.component.html',
  styleUrls: ['./dialog-addloan.component.scss']
})
export class DialogAddLoanComponent implements OnInit {

  displayedColumns: string[] = ['customer_id','customer_name' ,'address', 'nic_no', 'mobile_no','action'];
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
  public static nic_p: any;
  public static mobile_p: any;
  public static address_p: any;

  constructor(private LoanService:LoanService,private dialogRefAll: MatDialog,
    public dialogRef: MatDialogRef<DialogAddLoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     // this.all_value_group=data;

    }

  ngOnInit(): void {
    this.GetCustomerDetails();
  }


  GetCustomerDetails(){
    this.LoanService.get_customer_details().then(res=>this.dataSource.data = res as any[]);
    console.log(this.dataSource.data); 
  }

  SelectCustomer(id,name,nic,mobile,address){
     DialogAddLoanComponent.id_p = id;
     DialogAddLoanComponent.name_p = name;
     DialogAddLoanComponent.nic_p = nic;
     DialogAddLoanComponent.mobile_p = mobile;
     DialogAddLoanComponent.address_p = address;
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
  customer_id: string;
  customer_name: string;
  nic_no: string;
  mobile_no: string;
  address:string;
}

const ELEMENT_DATA: PeriodicElement[] = [];


function sd(sd: any) {
throw new Error('Function not implemented.');
}

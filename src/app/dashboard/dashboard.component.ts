import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import * as $ from 'jquery';
import { MatMenu } from '@angular/material/menu';
import { MatCheckbox } from '@angular/material/checkbox';
import { getRtlScrollAxisType } from '@angular/cdk/platform';
import  {Chart }from 'chart.js'
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import {LoanService} from 'src/app/services/loan.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogNoteComponent } from './dialognote/dialognote.component';


0
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['icon','loan_id','state' ,'fullname', 'rental','arrears','payment_plan', 'paying_date', 'mobile_no', 'note','informed'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public static back_btn_to_dashboard :boolean;
  formmodel :any={};
  event: string;
  result: any[];
  b_dead: number;
  b_due: number;
  b_tobe: number;

 constructor(private LoanService:LoanService, private toastr: ToastrService,public dialog: MatDialog,private router: Router,private Activeroute: ActivatedRoute) { }


  ngOnInit(): void {
    DashboardComponent.back_btn_to_dashboard =false;
    this.GetPaymentIndication();
  }

  AddLoan(){
    this.router.navigate(['add-loan'], { replaceUrl: true });
    DashboardComponent.back_btn_to_dashboard =true;
    
  }

  
  AddPayment(){
    this.router.navigate(['payment'], { replaceUrl: true });
    DashboardComponent.back_btn_to_dashboard =true;
    
  }
  
  async GetPaymentIndication(){
  await this.LoanService.get_payment_indication().then(res=>this.dataSource.data = res as any[]);
  // console.log(this.dataSource.data[0].fullname); 
   this.b_dead =0;
   this.b_due =0;
   this.b_tobe =0; 
   for(let item of this.dataSource.data){
     if(item.state=="Dead"){
      this.b_dead++;
     }
     else if(item.state=="Due"){
      this.b_due++;
     }
     else if(item.state=="To be"){
      this.b_tobe++;
     }
   
 }
   



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

  applyFilter_type(event) {
    const filterValue = event;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(item,arry): void {
    
    arry=item;
    const dialogRef = this.dialog.open(DialogNoteComponent, {
      width: '35%',
      data:arry,
      
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetPaymentIndication();
      console.log('The dialog was closed');
      
    });
  }

  filter_dead(){
    this.event ="";
    this.event ="Dead";
    this.applyFilter_type(this.event);
  }

  filter_due(){
    this.event ="";
    this.event ="Due";
    this.applyFilter_type(this.event);
  }

  filter_tobe(){
    this.event ="";
    this.event ="To be";
    this.applyFilter_type(this.event);
  }

  filter_all(){
    this.event ="";
    this.applyFilter_type(this.event);
  }

}

export interface PeriodicElement {
  loan_id: string;
  state:string;
  fullname: string;
  colour: string;
  payment_plan: string;
  rental: string;
  arrears:string;
  paying_date: string;
  mobile_no: string;
  note: string;
  informed: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [];


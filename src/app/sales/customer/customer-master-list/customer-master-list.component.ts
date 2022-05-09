import { Component,ViewChild, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import {SelectionModel} from '@angular/cdk/collections';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { CustomerMasterService } from 'src/app/services/sales/customer-master.service';

@Component({
  selector: 'app-customer-master-list',
  templateUrl: './customer-master-list.component.html',
  styleUrls: ['./customer-master-list.component.scss']
})
export class CustomerMasterListComponent implements OnInit {
  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 10000);
  //1000 = 1seconds
  public lan = AppComponent;
  Isfilter:boolean=false;
  displayedColumnshost: string[] = ['customer_id','customer_name','contact_no','last_modified','edit','delete'];
   dshost= new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  formmodel :any={};
  @ViewChild('paginatorHost') paginatorHost: MatPaginator;
  @ViewChild('sortHost') sortHost: MatSort;
  errors: any;
  filteredValues: any;
  constructor(private router: Router,private toastr: ToastrService,
    private sanitizer: DomSanitizer,private CustomerMasterService:CustomerMasterService,
    public dialog: MatDialog,private location: Location) { 
  }
  fileUrl;
  data;
  
  positionFilter = new FormControl();
  nameFilter = new FormControl();
  globalFilter = '';



  async ngOnInit(): Promise<void> {
   







     await this.CustomerMasterService.get_list().then(res=>this.dshost.data = res as any[]);


  


  }






  async clear_form(){

      await this.CustomerMasterService.get_list().then(res=>this.dshost.data = res as any[]);
  }

  
  

  applyFilter() {
    const filterValue = this.formmodel.filter;
    this.dshost.filter = filterValue.trim().toLowerCase();
  }



  async btnrefreshclick(){
    $(".icorefresh").css("animation", "rotation 1s infinite linear");
     await this.clear_form();
    $(".icorefresh").css("animation", "rotation 0s infinite linear");
  }

  async delete(host_id){
    if(confirm("Are you sure to delete Customer")) {

    await this.CustomerMasterService.delete(host_id).subscribe(
      result => {
        NavigationComponent.refresh_status = 0;
        this.toastr.success("Success",'Delete Customer');
        //this.Clearform();
      },
      error => {
        this.errors = error.error;
        var error_key;
        for(let key in error.error){
          error_key = key;break;
        }
          this.toastr.error(this.errors?.[error_key],'Delete Customer');

       // this.frmmodel.IsbtnSaveDisabled = false;
      },() => {
       
        
      }
    );
    this.clear_form();
    }
  }


  navAddhost(){
    this.router.navigate(['customer-master-add'], { replaceUrl: true });
  }
  edit(id){
    this.router.navigate(['customer-master-edit/'+id], { replaceUrl: true });
  }



  ngAfterViewInit(){
    this.dshost.paginator = this.paginatorHost;
    this.dshost.sort = this.sortHost;
}




btnfilterclick(){
   if(this.Isfilter)
   {
     this.Isfilter = false;
   }
   else
   {
     this.Isfilter = true;
   }
}
 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dshost.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dshost.data.forEach(row => this.selection.select(row));
  }




}



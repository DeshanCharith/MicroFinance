import {COMMA, ENTER} from '@angular/cdk/keycodes';
import * as $ from 'jquery';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl,FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { stringify } from '@angular/compiler/src/util';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { MatDialog } from '@angular/material/dialog';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { LoanOfficerAddDialogComponent } from '../loan-officer-add-dialog/loan-officer-add-dialog.component';
import { LoanOfficerService } from '../../services/loan-officer/loan-officer.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-loan-officer-add',
  templateUrl: './loan-officer-add.component.html',
  styleUrls: ['./loan-officer-add.component.scss']
})
export class LoadOfficerAddComponent implements OnInit {

  @ViewChild('paginatorHost') paginatorHost: MatPaginator;
  @ViewChild('sortHost') sortHost: MatSort;
  
  frmmodel :any={};

  public lan = AppComponent;
  visible = true;
  selectable = true;
  removable = true;

  displayedColumns: string[] = ['name','edit','delete'];
  dataSource= new MatTableDataSource<any>();
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private router: Router, private toastr: ToastrService,
    public dialog: MatDialog,private Activeroute: ActivatedRoute,private LoanOfficerService: LoanOfficerService) { 

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginatorHost;
    this.dataSource.sort = this.sortHost;
}

  async ngOnInit(): Promise<void> {
    await this.LoanOfficerService.get_list().then(res=>this.dataSource.data = res as any[]);
    console.log(this.dataSource)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async btnrefreshclick(){
    $(".icorefresh").css("animation", "rotation 1s infinite linear");
    await this.ngOnInit();
   $(".icorefresh").css("animation", "rotation 0s infinite linear");
  }

  async openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(LoanOfficerAddDialogComponent, {
      width: '400px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event != 'Cancel'){
        this.ngOnInit();
      }
    });
    this.ngOnInit();
  }






  


  btnbackclick()
  {
    this.router.navigate(['item-master-list'], { replaceUrl: true });
  }






 







}
export interface PeriodicElement {
  id:number;
  name: string;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 
];
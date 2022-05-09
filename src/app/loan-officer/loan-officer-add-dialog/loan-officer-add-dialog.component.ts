import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoanOfficerService } from '../../services/loan-officer/loan-officer.service';

export interface UsersData {
  value: string;
  name: string;
  id: number;
}

@Component({
  selector: 'app-loan-officer-add-dialog',
  templateUrl: './loan-officer-add-dialog.component.html',
  styleUrls: ['./loan-officer-add-dialog.component.scss']
})
export class LoanOfficerAddDialogComponent implements OnInit {

  action:string;
  local_data:any;
  errors: any;
  constructor(
    private toastr: ToastrService, private LoanOfficerService: LoanOfficerService,
    public dialogRef: MatDialogRef<LoanOfficerAddDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    this.local_data = {...data};
    this.action = this.local_data.action;
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  doAction(){
    if(this.action=='Add'||this.action=='Update'){
      this.action_save();
    }
    else if(this.action=='Delete'){
      this.action_delete();
    }
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }


  async action_save(){

    const data = {
      id :this.local_data.id,
      name : this.local_data.name
    }

    await this.LoanOfficerService.save(data).subscribe(
      result => {
       if(this.local_data.action=='Add'){
        this.toastr.success("Success",'Create Loan Officer');
       }
       else if(this.local_data.action=='Update'){
        this.toastr.success("Success",'Update Loan Officer');
       }
       
      },
      error => {
        this.errors = error.error;
        var error_key;
        for(let key in error.error){
          error_key = key;break;
        }
          this.toastr.error(this.errors?.[error_key],'Create Loan Officer');

      },() => {
       
        
      }
    );
  }



  async action_delete(){
    await this.LoanOfficerService.delete(this.local_data.id).subscribe(
      result => {
        this.toastr.success("Success",'Delete Loan Officer');
      },
      error => {
        this.errors = error.error;
        var error_key;
        for(let key in error.error){
          error_key = key;break;
        }
          this.toastr.error(this.errors?.[error_key],'Delete Loan Officer');

      },() => {
       
        
      }
    );
    this.ngOnInit();
  }

}

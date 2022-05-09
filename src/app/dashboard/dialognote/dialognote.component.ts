import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoanService } from 'src/app/services/loan.service';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  value_host: string;
  group_name:string;  
}
@Component({
  selector: 'app-dialognote',
  templateUrl: './dialognote.component.html',
  styleUrls: ['./dialognote.component.scss']
})
export class DialogNoteComponent implements OnInit {

  all_value:any=[];
  frmmodel: any={};
  errors: any;


  constructor(
    public dialogRef: MatDialogRef<DialogNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private LoanService:LoanService,private toastr: ToastrService,) {
      this.all_value=data;
      this.frmmodel.loan_no=this.all_value[0];
      this.frmmodel.note=this.all_value[1];


    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  async  SaveNote(){
console.log(this.frmmodel);
    await this.LoanService.add_note(this.frmmodel).subscribe(
      result => {
        this.toastr.success("Successfully save a note",'Add note');
      
      },
      error => {
        this.errors = error.error;
        var error_key;
        for(let key in error.error){
          error_key = key;break;
        }
         this.toastr.error(this.errors?.[error_key],'Add note');
  
      },() => {
         
      }
    );
    
     
  }
  

}

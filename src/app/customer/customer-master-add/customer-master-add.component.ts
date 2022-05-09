import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl,FormBuilder, FormGroup, FormArray, ValidatorFn, NgForm} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import {MatTab} from '@angular/material/tabs';
import { AppComponent } from 'src/app/app.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { stringify } from '@angular/compiler/src/util';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { MatDialog } from '@angular/material/dialog';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { CustomerMasterService } from 'src/app/services/customer/customer-master.service';

@Component({
  selector: 'app-customer-master-add',
  templateUrl: './customer-master-add.component.html',
  styleUrls: ['./customer-master-add.component.scss']
})
export class CustomerMasterAddComponent implements OnInit {

  
 


  frmmodel :any={};
  validation :any={};
  public lan = AppComponent;
 
  
  center_fctrl = new FormControl();
  center_data: any[];
  filtered_center: Observable<string[]>;

  team_fctrl = new FormControl();
  team_data: any[];
  filtered_team: Observable<string[]>;



  default_data :any={};

  load_data :any={};

  
  errors: any;
  IsEdit: boolean;
  url: string | ArrayBuffer;





  constructor(private router: Router, private toastr: ToastrService,
    public dialog: MatDialog,private Activeroute: ActivatedRoute,
    private CustomerMasterService:CustomerMasterService, private formBuilder: FormBuilder,
    ) { 
  }




  ngOnInit(): void {
    this.Clearform();
    if(this.Activeroute.snapshot.paramMap.get('id')){
      this.IsEdit = true;
      this.frmmodel.id=this.Activeroute.snapshot.paramMap.get('id'); 
      this.LoadData();

    }
    else{
      this.IsEdit = false;
    }
  }

  async LoadData() {
    const id = Number(this.Activeroute.snapshot.paramMap.get('id'));
    await this.CustomerMasterService.load(id).then(res=>this.load_data = res as any[]);
    this.frmmodel.id = id;
    this.frmmodel.customer_id = this.load_data['tbl_customer_master'][0]['customer_id'];
    this.frmmodel.customer_name = this.load_data['tbl_customer_master'][0]['customer_name'];
    this.frmmodel.nic_no = this.load_data['tbl_customer_master'][0]['nic_no'];
    this.frmmodel.mobile_no = this.load_data['tbl_customer_master'][0]['mobile_no'];
    this.frmmodel.tel_no = this.load_data['tbl_customer_master'][0]['tel_no'];
    this.frmmodel.email = this.load_data['tbl_customer_master'][0]['email'];
    this.frmmodel.address = this.load_data['tbl_customer_master'][0]['address'];
    this.frmmodel.office_address = this.load_data['tbl_customer_master'][0]['office_address'];
    this.frmmodel.grama_niladhari = this.load_data['tbl_customer_master'][0]['business_nature'];
    this.frmmodel.center = this.load_data['tbl_customer_master'][0]['center'];
    this.frmmodel.team = this.load_data['tbl_customer_master'][0]['team'];
    this.frmmodel.job_or_business = this.load_data['tbl_customer_master'][0]['job_or_business'];
    this.frmmodel.document = this.load_data['tbl_customer_master'][0]['document'].replaceAll(',','').split('');
    console.log(this.load_data['tbl_customer_master'][0]['document'].replaceAll(',','').split(''))
  }





  async Get_form_data(default_data:any) {

    this.center_data = default_data['center_data'];
    this.team_data = default_data['team_data'];
    this.frmmodel.customer_id = default_data['customer_id'];
     
     this.filtered_center = this.center_fctrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter_center(value))
     );
  
    this.filtered_team = this.team_fctrl.valueChanges.pipe(
     startWith(''),
     map(value => this._filter_team(value))
    );
 
    
    }
   

    private _filter_center(custom_field1: string): string[] {
     const filterValue = this._normalizeValue(custom_field1);
     return this.center_data.filter(center_data => this._normalizeValue(center_data.center).includes(filterValue));//get '%%' //
    // return this.custom1_data.filter(custom1_data => custom1_data.custom_field1.toLowerCase().indexOf(custom_field1) === 0);get '%' 
   }
   private _filter_team(value: string): string[] {
     const filterValue = this._normalizeValue(value);
     return this.team_data.filter(team_data => this._normalizeValue(team_data.team).includes(filterValue));
   }
   private _normalizeValue(value: string): string {
     return value.toLowerCase().replace(/\s/g, '');
   }
 
  

  async Clearform() {
   
        this.frmmodel.id=0; 
        this.frmmodel.IsbtnSaveDisabled = false;
        this.frmmodel.customer_id = '';
        this.frmmodel.customer_name = '';
        this.frmmodel.nic_no = '';
        this.frmmodel.mobile_no = '';
        this.frmmodel.tel_no = '';
        this.frmmodel.email = '';
        this.frmmodel.address = '';
        this.frmmodel.office_address = '';
        this.frmmodel.grama_niladhari = '';
        this.frmmodel.center = '';
        this.frmmodel.team = '';
        this.frmmodel.job_or_business = '';
        this.frmmodel.document = '';

       await this.CustomerMasterService.get_formdata().then(res=>this.default_data = res as any[])
       this.Get_form_data(this.default_data);
   
  }

  btnbackclick()
  {
    this.router.navigate(['customer-master-list'], { replaceUrl: true });
  }

  btncancelclick(){
  this.Clearform();
  }




  async clicksubmit()
  {
    if(this.frmvalidation())
    {
       return;
    }
    this.frmmodel.IsbtnSaveDisabled = true;
    
    const myFormData = new FormData();
    myFormData.append('id', this.frmmodel.id);
    myFormData.append('customer_id',this.frmmodel.customer_id);
    myFormData.append('customer_name',this.frmmodel.customer_name);
    myFormData.append('nic_no',this.frmmodel.nic_no);
    myFormData.append('mobile_no',this.frmmodel.mobile_no);
    myFormData.append('tel_no',this.frmmodel.tel_no);
    myFormData.append('email',this.frmmodel.email);
    myFormData.append('address',this.frmmodel.address);
    myFormData.append('office_address',this.frmmodel.office_address);
    myFormData.append('grama_niladhari',this.frmmodel.grama_niladhari);
    myFormData.append('center',this.frmmodel.center);
    myFormData.append('team',this.frmmodel.team);
    myFormData.append('job_or_business',this.frmmodel.job_or_business);
    myFormData.append('document',this.frmmodel.document.toString());


      await this.CustomerMasterService.save(myFormData).subscribe(
      result => {
        if(this.frmmodel.id==0)
        {
          this.toastr.success("Success",'Create Customer');
        }
        else
        {
          this.toastr.success("Success",'Update Customer');
          this.router.navigate(['customer-master-list'], { replaceUrl: true });
        }
        NavigationComponent.refresh_status = 0;
        this.Clearform();
      },
      error => {
        this.errors = error.error;
        var error_key;
        for(let key in error.error){
          error_key = key;break;
        }
          this.toastr.error(this.errors?.[error_key],'Create Customer');

        this.frmmodel.IsbtnSaveDisabled = false;
      },() => {
       
        
      }
    );

     

  }

  frmvalidation() {
    this.validation.customer_id ='';
    this.validation.customer_name ='';
    var IsInvalid = false;
    if(this.frmmodel.customer_id.length==0)
    {
     this.validation.customer_id = "* Customer id name is required.";
     IsInvalid = true;
    }
    if(this.frmmodel.customer_name.length==0)
    {
     this.validation.customer_name = "* Customer Name is required.";
     IsInvalid = true;
    }
   
   return IsInvalid;
  }

 

  on_customer_id_change(): void {  
    if(this.frmmodel.customer_id.length==0)
    {
     this.validation.customer_id = "* Customer id is required.";
    }
    else
    {
      this.validation.customer_id = "";
    }
  }

  on_customer_name_change(): void {  
    if(this.frmmodel.customer_name.length==0)
    {
     this.validation.customer_name = "* Customer Name is required.";
    }
    else
    {
      this.validation.customer_name = "";
    }
  }



}

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
import { CustomerMasterService } from 'src/app/services/sales/customer-master.service';

@Component({
  selector: 'app-customer-master-add',
  templateUrl: './customer-master-add.component.html',
  styleUrls: ['./customer-master-add.component.scss']
})
export class CustomerMasterAddComponent implements OnInit {

  
  host_list :any = [];
  host_group : any[];
 
  Access_group: any[];


  frmmodel :any={};
  validation :any={};
  HostForm: FormGroup;
  public lan = AppComponent;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  host_perent_ctrl = new FormControl();
  host_group_ctrl = new FormControl();
 
  filtered_host_perent: Observable<string[]>;
  filtered_host_group: Observable<string[]>;
 
  host_perent_items: string[] = [];
  host_group_items: string[] = [];

  host_data :any={};

  maxatt?:string;
  chkintervel?:string;

  host_form_data : any[];


  WareHouseMasterList: any[];
  ItemWhise:any[];
  public ItemWhiseDate: Array<{warehouse_code: string}> = [];
  

  item_class_data: any[];
  uom_data: any[];


  category_fctrl = new FormControl();
  category_data: any[];
  filtered_category: Observable<string[]>;

  vendor_fctrl = new FormControl();
  vendor_data: any[];
  filtered_vendor: Observable<string[]>;

  
  custom1_fctrl = new FormControl();
  custom1_data: any[];
  filtered_custom1: Observable<string[]>;

  custom2_fctrl = new FormControl();
  custom2_data: any[];
  filtered_custom2: Observable<string[]>;

  custom3_fctrl = new FormControl();
  custom3_data: any[];
  filtered_custom3: Observable<string[]>;

  custom4_fctrl = new FormControl();
  custom4_data: any[];
  filtered_custom4: Observable<string[]>;

  custom5_fctrl = new FormControl();
  custom5_data: any[];
  filtered_custom5: Observable<string[]>;


  default_data :any={};

  load_data :any={};



  

  displayedColumns: string[] = ['name', 'value','edit','delete'];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  errors: any;
  IsEdit: boolean;
  command_View: any;
  url: string | ArrayBuffer;
  file: any;





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
    this.frmmodel.vendor_id = this.load_data['tbl_vendor_master'][0]['customer_id'];
    this.frmmodel.vendor_name = this.load_data['tbl_vendor_master'][0]['customer_name'];
    this.frmmodel.address = this.load_data['tbl_vendor_master'][0]['address'];
    this.frmmodel.contact_no = this.load_data['tbl_vendor_master'][0]['contact_no'];
    this.frmmodel.email = this.load_data['tbl_vendor_master'][0]['email'];
    this.frmmodel.company_name = this.load_data['tbl_vendor_master'][0]['company_name'];
    this.frmmodel.company_contact_no = this.load_data['tbl_vendor_master'][0]['company_contact_no'];
    this.frmmodel.custom_field1 = this.load_data['tbl_vendor_master'][0]['custom_field1'];
    this.frmmodel.custom_field2 = this.load_data['tbl_vendor_master'][0]['custom_field2'];
    this.frmmodel.custom_field3 = this.load_data['tbl_vendor_master'][0]['custom_field3'];
    this.frmmodel.custom_field4 = this.load_data['tbl_vendor_master'][0]['custom_field4'];
    this.frmmodel.custom_field5 = this.load_data['tbl_vendor_master'][0]['custom_field5'];
    
     this.url = "assets/images/customer_master/"+this.frmmodel.vendor_id+".jpg";
   
  }





  async Get_form_data(default_data:any) {

    //this.frmmodel.item_code = default_data['item_code'];


    this.custom1_data = default_data['custom_field1'];
    this.custom2_data = default_data['custom_field2'];
    this.custom3_data = default_data['custom_field3'];
    this.custom4_data = default_data['custom_field4'];
    this.custom5_data = default_data['custom_field5'];

    this.filtered_category = this.category_fctrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter_category(value))
     );

     this.filtered_vendor = this.vendor_fctrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter_vendor(value))
     );
     
     this.filtered_custom1 = this.custom1_fctrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter_custom1(value))
     );
  
 
    this.filtered_custom1 = this.custom1_fctrl.valueChanges.pipe(
     startWith(''),
     map(value => this._filter_custom1(value))
    );
 
    this.filtered_custom2 = this.custom2_fctrl.valueChanges.pipe(
     startWith(''),
     map(value => this._filter_custom2(value))
    );
 
    this.filtered_custom3 = this.custom3_fctrl.valueChanges.pipe(
     startWith(''),
     map(value => this._filter_custom3(value))
    );
 
    this.filtered_custom4 = this.custom4_fctrl.valueChanges.pipe(
     startWith(''),
     map(value => this._filter_custom4(value))
    );
 
    this.filtered_custom5 = this.custom5_fctrl.valueChanges.pipe(
     startWith(''),
     map(value => this._filter_custom5(value))
    );
    
    }
   
    private _filter_category(category: string): string[] {
      const filterValue = this._normalizeValue(category);
      return this.category_data.filter(category_data => this._normalizeValue(category_data.category).includes(filterValue));
    }

    private _filter_vendor(value: string): string[] {
      const filterValue = this._normalizeValue(value);
      return this.vendor_data.filter(vendor_data => this._normalizeValue(vendor_data.name).includes(filterValue));
    }

    private _filter_custom1(custom_field1: string): string[] {
     const filterValue = this._normalizeValue(custom_field1);
     return this.custom1_data.filter(custom1_data => this._normalizeValue(custom1_data.custom_field1).includes(filterValue));//get '%%' //
    // return this.custom1_data.filter(custom1_data => custom1_data.custom_field1.toLowerCase().indexOf(custom_field1) === 0);get '%' 
   }
   private _filter_custom2(value: string): string[] {
     const filterValue = this._normalizeValue(value);
     return this.custom2_data.filter(custom_field2 => this._normalizeValue(custom_field2.custom_field2).includes(filterValue));
   }
   private _filter_custom3(value: string): string[] {
     const filterValue = this._normalizeValue(value);
     return this.custom3_data.filter(custom_field3 => this._normalizeValue(custom_field3.custom_field3).includes(filterValue));
   }
   private _filter_custom4(value: string): string[] {
     const filterValue = this._normalizeValue(value);
     return this.custom4_data.filter(custom_field4 => this._normalizeValue(custom_field4.custom_field4).includes(filterValue));
   }
   private _filter_custom5(value: string): string[] {
     const filterValue = this._normalizeValue(value);
     return this.custom5_data.filter(custom_field5 => this._normalizeValue(custom_field5.custom_field5).includes(filterValue));
   }
 
   private _normalizeValue(value: string): string {
     return value.toLowerCase().replace(/\s/g, '');
   }
 
  

  async Clearform() {
   
        this.frmmodel.id=0; 
        this.frmmodel.IsbtnSaveDisabled = false;
        this.frmmodel.vendor_id=''; 
        this.frmmodel.vendor_name=''; 
        this.frmmodel.address='';  
        this.frmmodel.contact_no='';  
        this.frmmodel.email=''; 
        this.frmmodel.company_name=''; 
        this.frmmodel.company_contact_no='';  
      


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
    myFormData.append('image', this.file);
    myFormData.append('id', this.frmmodel.id);
    myFormData.append('customer_id',this.frmmodel.vendor_id);
    myFormData.append('customer_name',this.frmmodel.vendor_name);
    myFormData.append('address',this.frmmodel.address);
    myFormData.append('contact_no',this.frmmodel.contact_no);
    myFormData.append('email',this.frmmodel.email);
    myFormData.append('company_name',this.frmmodel.company_name);
    myFormData.append('company_contact_no',this.frmmodel.company_contact_no);
    myFormData.append('custom_field1',this.frmmodel.custom_field1);
    myFormData.append('custom_field2',this.frmmodel.custom_field2);
    myFormData.append('custom_field3',this.frmmodel.custom_field3);
    myFormData.append('custom_field4',this.frmmodel.custom_field4);
    myFormData.append('custom_field5',this.frmmodel.custom_field5);


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
    this.validation.vendor_id ='';
    this.validation.vendor_name ='';
    var IsInvalid = false;
    if(this.frmmodel.vendor_id.length==0)
    {
     this.validation.vendor_id = "* Customer id name is required.";
     IsInvalid = true;
    }
    if(this.frmmodel.vendor_name.length==0)
    {
     this.validation.vendor_name = "* Customer Name is required.";
     IsInvalid = true;
    }
   
   return IsInvalid;
  }

 

  on_item_id_change(): void {  
    if(this.frmmodel.vendor_id.length==0)
    {
     this.validation.vendor_id = "* Customer id is required.";
    }
    else
    {
      this.validation.vendor_id = "";
    }
  }

  on_description_change(): void {  
    if(this.frmmodel.vendor_name.length==0)
    {
     this.validation.vendor_name = "* Customer Name is required.";
    }
    else
    {
      this.validation.vendor_name = "";
    }
  }



  



setPhoto(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();

          reader.readAsDataURL(event.target.files[0]); // read file as data url

          reader.onload = (event) => { // called once readAsDataURL is completed
            this.url = event.target.result;
          }
        }
        this.file = event.target.files[0];
    }
}

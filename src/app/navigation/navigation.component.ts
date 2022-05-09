import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatCard } from '@angular/material/card';
import { MatButtonToggle } from '@angular/material/button-toggle'
import { MatGridList } from '@angular/material/grid-list';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatToolbar} from '@angular/material/toolbar';
import { MatMenu } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import * as $ from 'jquery';
import {MatTableDataSource} from '@angular/material/table';
import { AppComponent } from '../app.component';
import { TokenService } from '../services/authentication/token.service';
import { AuthStateService } from '../services/authentication/auth-state.service';
import { ToastrService } from 'ngx-toastr';
import { Location, LocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
 export  class  NavigationComponent implements OnInit {
 
  public lan = AppComponent;
  public th = NavigationComponent;
  select=1;
  displayedColumnnotifi: string[] = ['status', 'description', 'close'];
  dsnotifi= new MatTableDataSource<NotifiElement>(Notifi_ELEMENT_DATA);
  public static refresh_status: number;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    private toastr: ToastrService,
    private location: Location,
    public dialog: MatDialog,private Activeroute: ActivatedRoute
  ) { 
  }

  async ngOnInit(): Promise<void> {

    $.getScript('assets/jquery/main.js');
    if(this.location.path()==''){
      this.router.navigate(['home'], { replaceUrl: true });
      }



  }

  openDialog() {
   
  }

  click_btnrefresh(){
    this.openDialog();
  }

  
  
  hideMenu(){
    this.router.navigate(['home'], { replaceUrl: true });
   }

   ClickNavHost(){
    this.router.navigate(['item-master-list'], { replaceUrl: true });
   }

   ClickNavService(){
    this.router.navigate(['service-list'], { replaceUrl: true });
   }

   ClickNavLogs(){
    this.router.navigate(['logs-view'], { replaceUrl: true });
   }


   ClickNavTotalview(){
    /* const url = this.router.serializeUrl(
      this.router.createUrlTree(['/total-view'])
    );*/
    var url = location.toString();
    url=   url.replace(this.location.path(),"/total-view");
    window.open(url, '_blank');

    //this.router.navigate(['total-view'], { replaceUrl: true });
   }

   ClickNavadminmain(){
    this.router.navigate(['administration-main'], { replaceUrl: true });
   }

   ClickNavHost_Group(){
    this.router.navigate(['host-group-list'], { replaceUrl: true });
   }

   ClickNavService_Group(){
    this.router.navigate(['service-group-list'], { replaceUrl: true });
   }


   ClickNavHost_Template(){
    this.router.navigate(['host-template-list'], { replaceUrl: true });
   }

   ClickNavService_Template(){
    this.router.navigate(['service-template-list'], { replaceUrl: true });
   }

   ClickNavContact(){
    this.router.navigate(['contact-list'], { replaceUrl: true });
   }

   ClickNavContact_Group(){
    this.router.navigate(['contact-group-list'], { replaceUrl: true });
   }

   ClickNavContact_Template(){
    this.router.navigate(['contact-template-list'], { replaceUrl: true });
   }

   ClickNavCommand(){
    this.router.navigate(['command-list'], { replaceUrl: true });
   }

   ClickItem_Category(){
    this.router.navigate(['item-master-category'], { replaceUrl: true });
   }

   ClickWareHouse_Master(){
    this.router.navigate(['warehouse-master-list'], { replaceUrl: true });
   }

   ClickDirect_GRN(){
    this.router.navigate(['direct-grn-list'], { replaceUrl: true });
   }

   logout(){
    this.auth.setAuthState(false);
    this.token.removeToken();
    localStorage.setItem('Islogin', 'false'); 
    location.reload();
   }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  showSubmenu2: boolean = false;
  showSubmenu3: boolean = false;
  showSubmenu4: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  onClick(clickid:any){
   this.select = clickid;
  }
  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
      this.showSubmenu = false;
      this.showSubmenu2 = false;
      this.showSubmenu3 = false;
      this.showSubmenu4 = false;
    }
  }
  
  menu(){
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded) {
      this.showSubmenu = false;
      this.showSubmenu2 = false;
      this.showSubmenu3 = false;
      this.showSubmenu4 = false;
    }

  }




}

export interface NotifiElement {
  status: string;
  description: string;
}

const Notifi_ELEMENT_DATA: NotifiElement[] = [
  {status: '1', description: 'NTA Alert on EAST-4331-WAN-CUBE-port'},
  {status: '2', description: 'NTA Alert on EAST-4331-WAN-CUBE-port'},
  {status: '3', description: 'NTA Alert on EAST-4331-WAN-CUBE-port'},
  {status: '1', description: 'NTA Alert on EAST-4331-WAN-CUBE-port'},
];
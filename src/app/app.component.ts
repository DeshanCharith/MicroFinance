import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';
 public static arrylan:any={};
 public static api_url;
  static  navigation :any={};
  constructor(private router: Router,private http: HttpClient,private location: Location){}
  public classReference = AppComponent;
  ngOnInit(): void {    
    this.LoadLanguageFile();
    this.LoadConfigFile();
    if(localStorage.getItem('Islogin')=='true')
    {
      if(this.location.path()=='/login'){
      this.router.navigate(['home'], { replaceUrl: true });
      }
      this.classReference.navigation.Islogin = true;
    }
    else
    {
      this.router.navigate(['login'], { replaceUrl: true });
      this.classReference.navigation.Islogin = false;

    }
    
    if(this.location.path()=='/total-view'){
      this.classReference.navigation.isSubview = false;
    }
    else
    {
      this.classReference.navigation.isSubview = true;
    }
  }


  LoadLanguageFile(){
    this.getText()
    .subscribe((data:any) => {
      //.replace(/(\r\n|\n|\r)/gm, ",")//remove \n & \r
      interface LooseObject {
        [key: string]: any
      }
      var obj: LooseObject = {};
      for (const line of data.split(/[\r\n]+/)){
        if(line.includes(':')){
        obj[line.split(/:/)[0].trim()] = line.split(/:/)[1].trim();
        }
      }

       AppComponent.arrylan = obj;

    });//end subcribe
  }

  LoadConfigFile(){
    this.getConfig()
    .subscribe((data:any) => {
      //.replace(/(\r\n|\n|\r)/gm, ",")//remove \n & \r
      interface LooseObject {
        [key: string]: any
      }
      var obj: LooseObject = {};
      for (const line of data.split(/[\r\n]+/)){
        if(line.includes('=')){
        obj[line.split(/=/)[0].trim()] = line.split(/=/)[1].trim();
        }
      }

      localStorage.setItem('api_url', obj.url);
    //  AppComponent.api_url = obj.url;

    });//end subcribe
  }

  getConfig(){
    return this.http.get('assets/config/config.txt', {responseType: 'text'});
  }

  getText(){
    return this.http.get('assets/language/lan.txt', {responseType: 'text'});
  }
  
}

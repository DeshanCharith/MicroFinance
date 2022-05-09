import { Component, OnInit, Injectable } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthStateService } from '../services/authentication/auth-state.service';
import { TokenService } from '../services/authentication/token.service';
import { AuthService } from '../services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;
  public lan = AppComponent;
  constructor(private router: Router,private http: HttpClient,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private toastr: ToastrService)
    {
      this.loginForm = this.fb.group({
        name: [],
        password: []
      })
    }
   ngOnInit(): void {
  }

 


  onSubmit(){
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
        if(this.errors?.name)
        {
          this.toastr.error(this.errors.name,'Login');
        }
        else if(this.errors?.password)
        {
          this.toastr.error(this.errors.password,'Login');
        }
        else
        {
          this.toastr.error(this.errors.error,'Login');
        }
      },() => {
        this.toastr.success("Success",'Login');
        this.authState.setAuthState(true);
        localStorage.setItem('Islogin', 'true'); 
        location.reload();
      }
    );

   
   
  }


  // Handle response
  responseHandler(data){
    this.token.handleData(data.access_token);
  }

  

}


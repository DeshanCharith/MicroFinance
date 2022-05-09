import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  url=localStorage.getItem('api_url');

  add_loan(data:any)
  {
    return this.http.post('http://'+this.url+'/api/auth/add-loan',data); 
  }

  get_customer_details() {
    return this.http.get('http://'+this.url+'/api/auth/get-cus-details').toPromise();
  }

  get_loan_details() {
    return this.http.get('http://'+this.url+'/api/auth/get-loan-details').toPromise();
  }

  delete_loan(data:any)
  { 
    return this.http.post('http://'+this.url+'/api/auth/delete-loan',data); 
  }

  edit_loan(data:any)

  {
    return this.http.post('http://'+this.url+'/api/auth/edit-loan',data); 
  }

  add_payment(data:any)
  {
    return this.http.post('http://'+this.url+'/api/auth/add-payment',data); 
  }

  get_payment_details() {
    return this.http.get('http://'+this.url+'/api/auth/get-payment-details').toPromise();
  }

  delete_payment_rec(data:any)
  { 
    return this.http.post('http://'+this.url+'/api/auth/delete-payment',data); 
  }

  get_payment_indication()
  { 
    return this.http.get('http://'+this.url+'/api/auth/get-payment-indication').toPromise();
  }
  
  add_note(data:any)
  {
    return this.http.post('http://'+this.url+'/api/auth/add-note',data); 
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerMasterService {

  constructor(private http: HttpClient) { }
  api_url = localStorage.getItem('api_url');

  save(user: any): Observable<any> {
    return this.http.post<any>('http://'+this.api_url+'/api/auth/customer-master-create', user);
  }
  get_list() {
    return this.http.get('http://'+this.api_url+'/api/auth/customer-master-list').toPromise();
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('http://'+this.api_url+'/api/auth/customer-master-delete/'+id);
  }
  get_formdata() {
    return this.http.get('http://'+this.api_url+'/api/auth/customer-master-formdata').toPromise();

  }
  load(id: number) {
    return this.http.get('http://'+this.api_url+'/api/auth/customer-master-load/'+id).toPromise();
  }

}

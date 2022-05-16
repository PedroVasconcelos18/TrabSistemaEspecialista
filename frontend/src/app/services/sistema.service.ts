import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Sistema } from '../model/sistema.model';
@Injectable({
  providedIn: 'root'
})
export class SistemaService { 

  baseURL ="http://localhost:3001/sistemas";

  messageSuccess(message: String) {
    this.toastr.success(""+message);
  }

  messageDanger(message: String) {
    this.toastr.error(""+message);
  }

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  create(sistema: any) {
    return this.http.post(this.baseURL, sistema)
  }

  get() {
    return this.http.get(this.baseURL)
  }

  getById(id: string): Observable<Sistema>{
    const url = `${this.baseURL}/${id}`
    return this.http.get<Sistema>(url);
  }

  update(sistema: any){
    const url = `${this.baseURL}/${sistema.id}`
    return this.http.put(url, sistema)
  }

  delete(id: string){
    const url = `${this.baseURL}/${id}`
    return this.http.delete(url)
  }

}
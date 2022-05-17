
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Problema } from '../model/problema.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemasService {

  baseURL ="http://localhost:3001/problemas"

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  message(message: String) {
    this.toastr.success(""+message);
  }

  create(problema: Problema){
    return this.http.post(this.baseURL, problema)
  }

  getByIdSistema(id: any): Observable<Problema[]> {
    const url = `${this.baseURL}?idSistema=${id}`
    console.log(url);
    return this.http.get<Problema[]>(url)
  }

  getById(id: any): Observable<Problema> {
    const url = `${this.baseURL}/${id}`
    return this.http.get<Problema>(url)
  }

  get(id: any){
    return this.http.get(this.baseURL)
  }

  update(problemas: any){
    const url = `${this.baseURL}/${problemas.id}`
    return this.http.put(url, problemas)
  }

  delete(id: string){
    const url = `${this.baseURL}/${id}`
    return this.http.delete(url)
  }
}

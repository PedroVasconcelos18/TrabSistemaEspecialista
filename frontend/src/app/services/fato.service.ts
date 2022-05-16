
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Fato } from '../model/fato.model';

@Injectable({
  providedIn: 'root'
})
export class FatoService {

  baseURL ="http://localhost:3001/fato"

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  message(message: String) {
    this.toastr.success(""+message);
  }

  create(fato: Fato){
    return this.http.post(this.baseURL, fato)
  }

  getByIdSistema(id: any): Observable<Fato[]> {
    const url = `${this.baseURL}?idSistema=${id}`
    return this.http.get<Fato[]>(url)
  }

  getById(id: any): Observable<Fato> {
    const url = `${this.baseURL}/${id}`
    return this.http.get<Fato>(url)
  }

  get(id: any){
    return this.http.get(this.baseURL)
  }

  update(fato: any){
    const url = `${this.baseURL}/${fato.id}`
    return this.http.put(url, fato)
  }

  delete(id: string){
    const url = `${this.baseURL}/${id}`
    return this.http.delete(url)
  }
}

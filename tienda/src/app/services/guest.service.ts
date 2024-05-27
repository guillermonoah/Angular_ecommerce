import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  public url;

  constructor
  (
    private _http:HttpClient,
  )
  {
    this.url = GLOBAL.url;
  }
       
  obtener_producto_slug_publico(slug:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_producto_slug_publico/'+slug,{headers:headers});
  } 
       
  listar_producto_recomendados_publico(categoria:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_producto_recomendados_publico/'+categoria,{headers:headers});
  } 

}

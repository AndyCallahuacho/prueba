import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl= 'https://localhost:44320/api/';


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  getUsuarios(){
    const url = `${this.apiUrl }Usuario`;

    return this.http.get<Usuario[]>(url) ;

  }

  postUsuarios(nombre:string,correo:String){
    const url = `${this.apiUrl }Usuario`;
    return this.http.post(url,
      {
        id_usuario: 0,
        nombre,
        correo,
        estado: 0
      },this.httpOptions) ;
    
  }

  putUsuarios(nombre:string,correo:String,id:number){
    const url = `${this.apiUrl }Usuario/${id}`;
    return this.http.put(url,
      {
        id_usuario: 1,
        nombre,
        correo,
        estado: 1
      },this.httpOptions) ;
    
  }

  deletetUsuarios(id:number){
    const url = `${this.apiUrl }Usuario/${id}`;
    return this.http.delete(url,this.httpOptions) ;
    
  }

}

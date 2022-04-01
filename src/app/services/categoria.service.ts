import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  apiUrl= 'https://localhost:44320/api/';


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  getCategorias(){
    const url = `${this.apiUrl }Categoria`;
    return this.http.get<Categoria[]>(url) ;

  }

  postCategorias(nombre:string,id_usuario:number){
    const url = `${this.apiUrl }Categoria`;
    return this.http.post(url,
      {
        id_categoria: 0,
        id_usuario,
        nombre,
        estado: 0
      },this.httpOptions) ;
    
  }

  putCategorias(nombre:string,id_usuario:number,id:number){
    const url = `${this.apiUrl }Categoria/${id}`;
    return this.http.put(url,
      {
        id_usuario,
        nombre,
        estado: 1
      },this.httpOptions) ;
    
  }

  deletetCategorias(id:number){
    const url = `${this.apiUrl }Categoria/${id}`;
    return this.http.delete(url,this.httpOptions) ;
    
  }

}

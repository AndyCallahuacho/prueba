import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  apiUrl= 'https://localhost:44320/api/';


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  getProductos(){
    const url = `${this.apiUrl }Producto`;
    return this.http.get<Producto[]>(url) ;

  }

  postProductos(nombre:string,id_usuario:number,id_categoria: number,precio:number,descripcion:string){
    const url = `${this.apiUrl }Producto`;
    return this.http.post(url,
      {
        id_producto: 0,
        id_categoria,
        precio,
        id_usuario,
        nombre,
        estado: 0,
        descripcion
      },this.httpOptions) ;
    
  }

  putProductos(nombre:string,id_usuario:number,id_categoria: number,precio:number,descripcion:string,id:number){
    const url = `${this.apiUrl }Producto/${id}`;
    return this.http.put(url,
      {
        id_producto: 0,
        id_categoria,
        precio,
        id_usuario,
        nombre,
        estado: 0,
        descripcion
      },this.httpOptions) ;
    
  }

  deletetProductos(id:number){
    const url = `${this.apiUrl }Producto/${id}`;
    return this.http.delete(url,this.httpOptions) ;
    
  }

}

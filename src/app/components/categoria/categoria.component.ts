import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from '../../models/usuario.models';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  forma:FormGroup;
  id:number=0;
  estado = 1;
  datos: Categoria[] = [];
  dataSource= new MatTableDataSource();

  displayedColumns: string[] = ['id', 'nombre','idUsuario','acciones'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
    
  constructor(public fb: FormBuilder,private catSer:CategoriaService) {

    this.forma = fb.group({
      'nombre': '',
      'id_usuario': ''
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarCategorias(){
    this.catSer.getCategorias()
    .subscribe(resp => {  
      this.datos= resp;
      this.dataSource.data = this.datos;
      this.dataSource.paginator = this.paginator; 
    } );
  }

  agregarCategoria(){
    console.log(this.forma.value);
    
    this.catSer.postCategorias(this.forma.value.nombre,this.forma.value.idUsuario).subscribe(resp => this.cargarCategorias() )

    this.cargarCategorias();
  }

  editarCategoria(){

    console.log(this.id);
    
    this.catSer.putCategorias(this.forma.value.nombre,this.forma.value.id_usuario,this.id)
    .subscribe(resp => {this.cargarCategorias();}
    )

    this.cargarCategorias();
  }

  cancelarEditar(){
    this.estado =1;
    this.forma.setValue({
      nombre: '',
      id_usuario: ''
    })
  }

  obtenerCategoria(cat:Categoria){
    this.estado = 2;
    this.id= cat.id_usuario;
    this.forma.setValue({
      nombre: cat.nombre,
      id_usuario: cat.id_usuario
    })
  }

  borrarCategoria(id:number){
    this.catSer.deletetCategorias(id)
    .subscribe(resp=>{
      this.cargarCategorias();
    }
    )
  }  
}

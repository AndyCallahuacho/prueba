import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../models/usuario.models';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  forma:FormGroup;
  formvalues:any = {};
  id:number=0;
  estado = 1;

  datos: any[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'idUsuario', 'idCategoria', 'precio', 'desc','acciones'];
  dataSource= new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public fb: FormBuilder,
    private prodServ:ProductoService
  ) 
  { 
    this.forma = fb.group({
      'nombre': '',
      'id_usuario': '',
      'id_categoria': '',
      'precio': '',
      'desc': '',
  
    });
    
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.prodServ.getProductos()
    .subscribe(resp => {  
      this.datos= resp;
      this.dataSource.data = this.datos;
      this.dataSource.paginator = this.paginator; 
    } );
  }
  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  agregarProducto(){
    console.log(this.forma.value);

    this.formvalues = this.forma.value;
    
  
    
    this.prodServ.postProductos(this.formvalues.nombre,this.formvalues.id_usuario,this.formvalues.id_categoria,this.formvalues.precio,this.formvalues.desc).subscribe(resp => this.cargarProductos() )

    this.cargarProductos();
    
  }

  obtenerProducto(prod: Producto){
    
    this.forma.setValue({nombre:prod.nombre,id_usuario:prod.id_usuario,id_categoria:prod.id_categoria,precio:prod.precio,desc:prod.descripcion});
    this.estado = 2;
    this.id= prod.id_usuario;
    console.log(this.id);

    
  }

  editarProducto(){
    console.log(this.id);


    this.formvalues = this.forma.value;
    
    this.prodServ.putProductos(this.formvalues.nombre,this.formvalues.id_usuario,this.formvalues.id_categoria,this.formvalues.precio,this.formvalues.desc,this.id)
    .subscribe(resp => {
      console.log(resp);
      
      this.cargarProductos();
    }
    )

    this.cargarProductos();
  }

  cancelarEditar(){
    this.estado = 1;
    this.forma.setValue({nombre:'',id_usuario:'',id_categoria:'',precio:'',desc:''});

  }

  borrarProducto(id:number){
    this.prodServ.deletetProductos(id)
    .subscribe(resp=>{
      this.cargarProductos();
    }
    )
  }  
  

}

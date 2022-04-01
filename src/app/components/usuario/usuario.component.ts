import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  forma:FormGroup;

  id:number=0;
  estado = 1;
  datos: Usuario[] = [];
  dataSource= new MatTableDataSource();

  displayedColumns: string[] = ['id_usuario', 'nombre', 'correo','acciones'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public fb: FormBuilder,
    private usuServ:UsuarioService
  ) 
  { 
    this.forma = fb.group({
      'nombre': '',
      'correo': ''
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  
  ngAfterViewInit(){
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarUsuarios(){
    this.usuServ.getUsuarios()
    .subscribe(resp => {
      this.datos= resp;
      this.dataSource.data = this.datos;
      this.dataSource.paginator = this.paginator; 
    } );
  }

  agregarUsuario(){

    console.log(this.forma.value);
    
    this.usuServ.postUsuarios(this.forma.value.nombre,this.forma.value.correo).subscribe(resp => this.cargarUsuarios() )

    this.cargarUsuarios();
    
  }

  obtenerUsuario(usu: Usuario){
    this.forma.setValue({nombre:usu.nombre,correo:usu.correo});
    this.estado = 2;
    this.id= usu.id_usuario;
    
  
    
  }

  editarUsuario(){
    console.log(this.id);
    
    this.usuServ.putUsuarios(this.forma.value.nombre,this.forma.value.correo,this.id)
    .subscribe(resp => {this.cargarUsuarios();}
    )

    this.cargarUsuarios();
  }

  cancelarEditar(){
    this.estado = 1;
    this.forma.setValue({nombre:'',correo:''});

  }

  borrarUsuario(id:number){
    this.usuServ.deletetUsuarios(id)
    .subscribe(resp=>{
      this.cargarUsuarios();
    }
    )
  }  
}

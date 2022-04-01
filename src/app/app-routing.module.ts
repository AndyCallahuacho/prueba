import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
{ path:'usuario', component:UsuarioComponent},
{ path:'categoria', component:CategoriaComponent},
{ path:'producto', component:ProductoComponent},
{ path:'**', redirectTo:'usuario'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaComponent } from './pages/sistema/sistema.component';
import { FatosComponent } from './pages/fatos/fatos.component';
import { ResultadoComponent } from './pages/resultado/resultado.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }, 
  {
    path: "sistemas",
    component: SistemaComponent
  }, 
  {
    path: "fatos",
    component: FatosComponent
  }, 
  {
    path: "resultado",
    component: ResultadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

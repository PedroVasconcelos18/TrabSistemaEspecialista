import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaComponent } from './pages/sistema/sistema.component';
import { VariaveisComponent } from './pages/variaveis/variaveis.component';
import { RegrasComponent } from './pages/regras/regras.component';

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
    path: "variaveis",
    component: VariaveisComponent
  }, 
  {
    path: "regras",
    component: RegrasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

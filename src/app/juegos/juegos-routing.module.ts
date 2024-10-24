import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosMenuComponent } from '../paginas/juegos-menu/juegos-menu.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { MiJuegoComponent } from './mi-juego/mi-juego.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

const routes: Routes = [
  {path: '', component: JuegosMenuComponent},
  {path:'ahorcado', component: AhorcadoComponent},
  {path:'mayor-menor', component: MayorMenorComponent},
  {path:'preguntados', component: PreguntadosComponent},
  {path:'mi-juego', component: MiJuegoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class JuegosRoutingModule { }

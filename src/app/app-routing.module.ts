import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { EncuestaComponent } from './paginas/encuesta/encuesta.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { QuienSoyComponent } from './paginas/quien-soy/quien-soy.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { RespuestasComponent } from './paginas/respuestas/respuestas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'quienSoy', component: QuienSoyComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'encuesta', component: EncuestaComponent },
  { path: 'respuesta', component: RespuestasComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'juegos',
    loadChildren: () =>
      import('./juegos/juegos-routing.module').then(
        (m) => m.JuegosRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
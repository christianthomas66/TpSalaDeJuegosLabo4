import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { HomeComponent } from './paginas/home/home.component';
import { ErrorComponent } from './paginas/error/error.component';
import { QuienSoyComponent } from './paginas/quien-soy/quien-soy.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { PreguntadosComponent } from './juegos/preguntados/preguntados.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { JuegosMenuComponent } from './paginas/juegos-menu/juegos-menu.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { NavBarComponent } from './paginas/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './servicios/chat.service';
import { HttpClientModule } from '@angular/common/http';
import { EncuestaComponent } from './paginas/encuesta/encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoverImagenComponent } from './mover-imagen/mover-imagen.component';

@NgModule({
  declarations: [
   AppComponent,
   LoginComponent,
   HomeComponent,
   ErrorComponent,
   QuienSoyComponent,
   RegistroComponent,
   PreguntadosComponent,
   AhorcadoComponent,
   MayorMenorComponent,
   JuegosMenuComponent,
   NavBarComponent,
   ChatComponent,
   EncuestaComponent,
   MoverImagenComponent,
 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

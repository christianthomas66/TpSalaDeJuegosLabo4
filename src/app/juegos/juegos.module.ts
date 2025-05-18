import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JuegosRoutingModule } from './juegos-routing.module';
import { MiJuegoComponent } from './mi-juego/mi-juego.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
  ],
  providers: [],
})
export class JuegosModule { }

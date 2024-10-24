import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-mi-juego',
  templateUrl: './mi-juego.component.html',
  styleUrls: ['./mi-juego.component.scss']
})
export class MiJuegoComponent implements OnInit {

  public puntos :number = 0;
  public pelota: any;
  public tiempo: number = 0;
  estaJugando : boolean = false;
  mensajeJugador : string ='';
  termino: boolean = false;

 
  randNum :number =0;
  randNum2 :number =0;
  gano : boolean =false;

  usuarioLog : any={
    email:'',
    id:0
  }
  constructor(private firebase :AuthService) 
  { 
    firebase.getCurrentUser().subscribe(res=>{
      if(res!=null)
      {
        this.usuarioLog.email = res.email;
        this.usuarioLog.id = res.uid;
      }
    })
  }
  ngOnInit(): void {
    this.comenzarJuego();
  }
 
  comenzarJuego()
  {
   this.estaJugando = true;
   this.tiempo = 20;
   this.puntos = 0;
  }



 sumarPuntos(){
   if(this.estaJugando)
   {
     this.puntos++;
     this.pelota = document.getElementById("player");
     this.pelota.style.marginLeft = Math.round(Math.random()*270) + "px";
     this.pelota.style.marginTop = Math.round(Math.random()*270) + "px";
      if (this.puntos == 40) 
      {
      this.mensajeJugador = 'Ganaste 😎, se mandaron los resultados!';
      this.obtenerYCrearResultado();
       this.estaJugando = false;
       this.tiempo =0;
       this.termino=true;
       this.gano=true;
      }
   }
}

  contador :any = interval(1000).subscribe((n)=>{
    if(this.tiempo > 0){
          this.tiempo--;
          if (this.tiempo == 0 && this.puntos < 40)
          {

            this.mensajeJugador = 'Perdiste😞, se mandaron los resultados!';
            this.obtenerYCrearResultado();
            this.termino=true;
            this.tiempo = 0;
            this.puntos = 0;
            this.estaJugando = false;
          }
        }
   });

   obtenerYCrearResultado()
   {
     let fecha = new Date();
     let hoy = fecha.toLocaleDateString();
     let resultado ={
       juego:'truchoOsu',
       user: this.usuarioLog,
       fechaActual : hoy,
       puntaje: this.puntos,
       gano: this.gano
     }
     console.log(resultado);
     this.firebase.sendUserResultado('Osu 2.0Resultados',resultado).then(res=>{
      Swal.fire({
        title: "Osu 2.0",
        text: "Se mandaron los resultados con éxito!!!",
        icon: "success"
      });
       console.log('se mandaron(?');
       this.mensajeJugador='Se mandaron los resultados!👌';
     }).catch(err=>{
       console.log('no se mando nada xd')
     })
   }
 

}

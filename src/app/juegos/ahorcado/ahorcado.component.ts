import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  letrasBotones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  intentosRestantes : number = 6; 
  cantidadLetrasPalabra : string[] = [];
  palabras : string[] = ['hola', 'quiero', 'aprobar', 'laboratorio'];
  palabraAdivinar : string = '';
  numeroFoto : number = 0;
  estaJugando : boolean = false;
  mensajeJugador : string='';
  puntaje : number=0;
  gano: boolean=false;

  msjLog='';

  mostrarBotonResultado=false;

  usuarioLog : any={
    email:'',
    id:0
  }

  constructor(private firebase :AuthService, ) 
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

  reiniciarJuego()
  {
    location.reload;
  }
  

  comenzarJuego(){

    this.puntaje=0;
    this.intentosRestantes = 6;
    this.numeroFoto = 0;
    this.palabraAdivinar = this.palabras[Math.round(Math.random() * (this.palabras.length - 1))];
    this.cantidadLetrasPalabra = Array(this.palabraAdivinar.length).fill('_');
    this.estaJugando = true;
  }

  letraElegida(letraApretada : string){
    if(this.estaJugando)
    {
      let flag : boolean = false;
      for(let i = 0; i < this.palabraAdivinar.length; i++){
        if(letraApretada.toLowerCase() == this.palabraAdivinar[i]){
          this.cantidadLetrasPalabra[i] = letraApretada;
          this.puntaje++;
          flag = true;
        }
      }
  
      if(!flag){
        this.intentosRestantes--;
        if(this.intentosRestantes == 0){
          this.numeroFoto++;
          this.detenerJuego();
        }else{
          this.numeroFoto++;
        }
      }
      this.estadoJugador();

    }
  }

  estadoJugador(){
    this.gano=true;

    for (const i of this.cantidadLetrasPalabra) {
      if(i == "_"){
        this.gano=false;
       
      }
    }
    if(this.gano)
    { 

     
      setTimeout(() =>{

        this.mensajeJugador='Ganaste!😎'
      }, 2000);
      this.mostrarBotonResultado=true;
      this.msjLog='gano';

      this.obtenerYCrearResultado()

    }
  }

  detenerJuego(){
    this.estaJugando = false;
    this.puntaje=0;
    setTimeout(() =>{
      this.mensajeJugador='Perdiste!😞';
      this.mostrarBotonResultado=true;
      //this.comenzarJuego();
    }, 1000);

  }
  

  
  obtenerYCrearResultado()
  {
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let resultado ={
      juego:'ahorcado',
      user: this.usuarioLog,
      fechaActual : hoy,
      gano: this.gano
    }
    console.log(resultado);
    this.firebase.sendUserResultado('ahorcadoResultados',resultado).then(res=>{

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Se mandaron los reulstados con exito!!!"
      });

      console.log('se mandaron(?');
      this.mensajeJugador='Se mandaron los resultados!👌';
    }).catch(err=>{
      console.log('no se mando nada xd')
    })
  }



  
 
  
}

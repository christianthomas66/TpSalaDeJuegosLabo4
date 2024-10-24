import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { AuthService } from 'src/app/servicios/auth.service';

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  estaJugando: boolean = false;
  puntos: number = 0;
  juegoPausado: boolean=false;
  todosLosPaisesApi : any=[];
  paisElegidoRespuesta : any;
  paisesOpciones : any =[];
  mensajeJugador : string ='';
  mostrarR: boolean= false;

  
  usuarioLog : any={
    email:'',
    id:0
  }

  constructor(private apiPais : ApiService,private firebase :AuthService) 
  { 
    firebase.getCurrentUser().subscribe(res=>{
      if(res!=null)
      {
        this.usuarioLog.email = res.email;
        this.usuarioLog.id = res.uid;
      }
    })
  }

  ngOnInit(): void 
  {
    setTimeout(() => {}, 50);
    this.apiPais.getPaises().subscribe(paises =>{
      this.todosLosPaisesApi = paises;
      this.puntos=0;
      this.mensajeJugador='';
      console.log(this.todosLosPaisesApi)
    })
  }

  comenzarJuego()
  {
    this.mostrarR=false;
    this.mensajeJugador  ='';
    this.paisElegidoRespuesta = null;
    this.paisesOpciones = [];

    console.log('hola xd');
    for (let i = 0; i < 4; i++)
    {
      var numeroRandPais = Math.floor(Math.random() * (249 - 0) + 0);
      console.log('numeroPaisRandom '+ numeroRandPais);
      if(i ==0)
      {
        this.paisElegidoRespuesta = this.todosLosPaisesApi[numeroRandPais];
        console.log('pais'+this.paisElegidoRespuesta);
      }
      this.paisesOpciones.push(this.todosLosPaisesApi[numeroRandPais]);
    }
    console.log('pais elegido: '+this.paisElegidoRespuesta);
  }

  nuevoJuego()
  {
    this.puntos = 0;
    this.estaJugando = true;
    this.comenzarJuego();
  }

  elegirPais(pais: any)
  {
    if (pais == this.paisElegidoRespuesta) {
      console.log('gano');
      this.puntos++;
      this.comenzarJuego();
    } else {
      this.mostrarR= true;
      this.detenerJuego();
    }
  }

  detenerJuego2()
  {
    this.estaJugando = false;
    this.juegoPausado = !this.estaJugando;
    // swal({
    //   title: 'Perdiste!😞',
    //   text: 'Np, intenta otra vez.'
    // })
    //swal('Perdiste!😞');
    this.mensajeJugador = 'Ganaste!!!😎';
    //this.toastr.error('Intentalo de nuevo', '¡Perdiste!');
  }

  detenerJuego()
  {
    this.estaJugando = false;
    this.juegoPausado = !this.estaJugando;
    // swal({
    //   title: 'Perdiste!😞',
    //   text: 'Np, intenta otra vez.'
    // })
    //swal('Perdiste!😞');
    this.mensajeJugador = 'Perdiste!!!😞';
    //this.toastr.error('Intentalo de nuevo', '¡Perdiste!');
  }


  obtenerYCrearResultado()
  {
    //let juego ='preguntados',
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let resultado ={
      juego:'preguntados',
      user: this.usuarioLog,
      fechaActual : hoy,
      puntaje : this.puntos,
    }
    console.log(resultado);
    this.firebase.sendUserResultado('preguntadoColeccion',resultado).then(res=>{
      console.log('se mandaron(?')
      this.mensajeJugador='Se mandaron los resultados!👌';

      Swal.fire({
        title: "Preguntados",
        text: "Se mandaron los resultados con éxito!!!",
        icon: "success"
      });

      this.nuevoJuego()

    }).catch(err=>{
      console.log('no se mando nada xd')
    })
  }

}

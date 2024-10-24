import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {
  comenzar:boolean = false;
  puntaje:number = 0;
  mensaje:string = "";
  mensaje2:string = "";
  intentos:number = 3;
  cartaNumber: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,14,15];
  carta: number =0;
  cartaSig: number=0;
  mensajeJugador : string = '';
  numeroPartidasGanadas : number = 0;


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
  
  comenzarJuego(){
    this.comenzar = true;
    this.carta = this.cartaNumber[Math.floor(Math.random() * this.cartaNumber.length)];
    console.log("Mazo: " + this.carta);
    console.log(this.intentos);
    console.log("CORREGIR");
    this.intentos = 3;
    this.numeroPartidasGanadas = 0;

  }

  /*sigCarta(carta : number , opcion : string){
    this.cartaSig = this.cartaNumber[Math.floor(Math.random() * this.cartaNumber.length)];

    //Vemos si es mayor o menor.
    //y sumamos o restamos puntos.
    if(this.cartaSig > carta){
      if(opcion == 'mayor'){
        this.puntaje = this.puntaje + 1;
      }
    }
    if(this.cartaSig < carta){
        if(opcion == 'menor'){
        this.puntaje = this.puntaje + 1;
      }
    }
    if(this.cartaSig > carta){
      if(opcion == 'menor'){
        this.intentos = this.intentos - 1;
      }
    }
    if(this.cartaSig < carta){
      if(opcion == 'mayor'){
        this.intentos = this.intentos - 1;
      }
    }
    if(this.intentos <= 0){
      //mensaje
      // swal({
      //   title: 'Perdiste! 😞',
      //   text: 'Np,intenta otra vez!'
      // })
      //swal('Perdiste!')
      this.mensajeJugador = 'Perdiste😞';
      this.mensaje2 = "Puntos: " + this.puntaje;
      this.comenzar = false;
    }

    if(this.puntaje ==3)
    {
      // swal({
      //   title: 'Ganaste! 😎',
      //   text: 'Un kpo'
      // })
      this.mensajeJugador = 'Ganaste😎';
      this.comenzar = false;
      this.mensaje = "";
      this.mensaje2 = "";
      this.puntaje = 0;
      this.intentos = 0;
    }

    //mandamos la carta que sigue.
    this.carta = this.cartaSig;
    console.log("NuevaCarta: " + this.carta);
  }*/

    sigCarta(carta: number, opcion: string) {
      // Genera una nueva carta
      this.cartaSig = this.cartaNumber[Math.floor(Math.random() * this.cartaNumber.length)];
    
      // Evaluamos si la carta siguiente es mayor o menor que la actual
      if (this.cartaSig > carta) {
        if (opcion === 'mayor') {
          this.puntaje++;
        } else if (this.intentos > 0) {  // Solo restamos intentos si aún hay disponibles
          this.intentos--;
        }
      } else if (this.cartaSig < carta) {
        if (opcion === 'menor') {
          this.puntaje++;
        } else if (this.intentos > 0) {  // Solo restamos intentos si aún hay disponibles
          this.intentos--;
        }
      }
    
      // Verificamos si el jugador ha perdido (intentos <= 0)
      if (this.intentos <= 0) {
        this.mensajeJugador = 'Perdiste 😞';
        this.mensaje2 = 'Partidas ganadas: ' + this.numeroPartidasGanadas;
        this.comenzar = false;
      }
    
      // Verificamos si el jugador ha ganado (puntaje == 3)
      if (this.puntaje === 3 && this.numeroPartidasGanadas === 0) {
        this.mensajeJugador = 'Ganaste 😎';
        this.comenzar = false;
        this.mensaje = '';
        this.mensaje2 = '';
        this.puntaje = 0;
        this.intentos = 0;
        this.numeroPartidasGanadas++;
      }
    
      // Asignamos la nueva carta
      this.carta = this.cartaSig;
      console.log('NuevaCarta: ' + this.carta);
    }
    
    

  mayorMenor(opcion :string ){
    this.sigCarta(this.carta, opcion);
  } 

  reintentarJuego(){
    this.comenzar = false;
    this.mensaje = "";
    this.mensaje2 = "";
    this.puntaje = 0;
    this.intentos = 3;
    this.numeroPartidasGanadas = 0;
    console.log(this.intentos);
    console.log("CORREGIR_2");
  }


  // let usuarioJson : any = {
  //   email : this.miUsuario.email,
  //   date: new Date() 
  // }



  obtenerYCrearResultado()
  {
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let resultado ={
      juego:'mayor-menor',
      user: this.usuarioLog,
      fechaActual : hoy,
      puntaje : this.puntaje,
    }
    console.log(resultado);
    this.firebase.sendUserResultado('mayorMenorResultados',resultado).then(res=>{
      console.log('se mandaron(?');
      this.mensajeJugador='Se mandaron los resultados!👌';
    }).catch(err=>{
      console.log('no se mando nada xd')
    })
  }

}

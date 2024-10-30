import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { AuthService } from 'src/app/servicios/auth.service';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
})
export class PreguntadosComponent implements OnInit {
  estaJugando: boolean = false;
  puntos: number = 0;
  juegoPausado: boolean = false;
  todosLosPaisesApi: any = [];
  paisElegidoRespuesta: any;
  paisesOpciones: any = [];
  mensajeJugador: string = '';
  mostrarR: boolean = false;

  puntosTotales: number = 2;

  usuarioLog: any = {
    email: '',
    id: 0,
  };

  constructor(private apiPais: ApiService, private firebase: AuthService) {
    firebase.getCurrentUser().subscribe((res) => {
      if (res != null) {
        this.usuarioLog.email = res.email;
        this.usuarioLog.id = res.uid;
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {}, 50);
    this.apiPais.getPaises().subscribe((paises) => {
      this.todosLosPaisesApi = paises;

      this.puntos = 0;
      this.mensajeJugador = '';
    });
  }

  comenzarJuego() {
    this.mostrarR = false;
    this.mensajeJugador = '';
    this.paisElegidoRespuesta = null;
    this.paisesOpciones = [];

    const cantidadPaises = 56;

    let posicionCorrecta = Math.floor(Math.random() * 4);

    for (let i = 0; i < 4; i++) {
      var numeroRandPais = Math.floor(Math.random() * cantidadPaises);
      if (i === posicionCorrecta) {
        this.paisElegidoRespuesta = this.todosLosPaisesApi[numeroRandPais];
        this.paisesOpciones.push(this.paisElegidoRespuesta);
      } else {
        let paisIncorrecto;
        do {
          paisIncorrecto =
            this.todosLosPaisesApi[Math.floor(Math.random() * cantidadPaises)];
        } while (paisIncorrecto === this.paisElegidoRespuesta);

        this.paisesOpciones.push(paisIncorrecto);
      }
    }
  }

  nuevoJuego() {
    this.puntos = 0;
    this.estaJugando = true;

    this.comenzarJuego();
  }

  elegirPais(pais: any) {
    console.log('==========================================');
    console.log(this.paisElegidoRespuesta !== pais);
    console.log(this.paisElegidoRespuesta);
    console.log(pais);
    console.log('==========================================');

    if (
      this.puntos === this.puntosTotales &&
      this.paisElegidoRespuesta !== pais
    ) {
      this.estaJugando = false;

      Swal.fire({
        icon: 'error',
        title: 'Perdiste :c',
        text: 'Perdiste pero igual se mandaron los resultados je',
      });

      this.mandarResultados(false);
    } else {
      if (this.puntos === this.puntosTotales) {
        this.estaJugando = false;

        Swal.fire({
          title: 'Ganaste',
          text: 'Se mandaron los resultados con éxito!!!',
          icon: 'success',
        });

        this.mandarResultados(true);
      } else {
        if (pais == this.paisElegidoRespuesta) {
          this.puntos++;

          this.comenzarJuego();
        } else {
          this.mostrarR = true;

          this.detenerJuego();
        }
      }
    }
  }

  mandarResultados(esGanador: boolean) {
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let resultado = {
      juego: 'preguntados',
      user: this.usuarioLog,
      fechaActual: hoy,
      puntaje: this.puntos,
      gano: esGanador,
    };

    this.firebase
      .sendUserResultado('preguntadoColeccion', resultado)
      .then((res) => {
        this.mensajeJugador = 'Se mandaron los resultados!👌';
      })
      .catch((err) => {
        console.log('no se mando nada xd');
      });
  }

  detenerJuego2() {
    this.estaJugando = false;
    this.juegoPausado = !this.estaJugando;

    this.mensajeJugador = 'Ganaste!!!😎';
  }

  detenerJuego() {
    this.estaJugando = false;
    this.juegoPausado = !this.estaJugando;

    this.mensajeJugador = 'Perdiste!!!😞';

    Swal.fire({
      icon: 'error',
      title: 'Perdiste :c',
      text: 'Perdiste pero igual se mandaron los resultados je',
    });

    this.mandarResultados(false);
  }

  obtenerYCrearResultado() {
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let resultado = {
      juego: 'preguntados',
      user: this.usuarioLog,
      fechaActual: hoy,
      puntaje: this.puntos,
    };

    this.firebase
      .sendUserResultado('preguntadoColeccion', resultado)
      .then((res) => {
        this.mensajeJugador = 'Se mandaron los resultados!👌';

        Swal.fire({
          title: 'Preguntados',
          text: 'Se mandaron los resultados con éxito!!!',
          icon: 'success',
        });

        this.nuevoJuego();
      })
      .catch((err) => {
        console.log('no se mando nada xd');
      });
  }
}

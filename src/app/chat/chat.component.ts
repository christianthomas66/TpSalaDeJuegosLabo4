import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { AuthService } from '../servicios/auth.service';
import * as moment from 'moment';
import { ChatService } from '../servicios/chat.service';
import { User } from '@firebase/auth';
import { Event } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chat') chatContainer!: ElementRef;

  mensaje: string = '';
  mensajes: any[] = [];
  messages: any[] = [];
  usuarioLogueado: any;

  constructor(private auth: AuthService, private chatService: ChatService) {
    //Obtengo los mensajes de la coleccion
    this.chatService.obtenerMensajes().subscribe((mjs) => {
      this.mensajes = mjs;

      const chatElement = this.chatContainer.nativeElement;

      chatElement.scrollTop = chatElement.scrollHeight + 20;
    });
    if (this.mensajes == null) {
      this.mensajes = [];
    }
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((usuario: any) => {
      this.usuarioLogueado = usuario;
    });
  }

  onInput(e: any) {
    if (e.key === 'Enter') {
      this.enviarMensaje();
    }
  }

  enviarMensaje() {
    let fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    let mensaje = {
      usuario: {
        id: this.usuarioLogueado.uid,
        email: this.usuarioLogueado.email,
      },
      texto: this.mensaje,
      fecha: fecha,
    };

    console.log(this.validateMessage(this.mensaje));    

    if (this.validateMessage(this.mensaje)) {
      this.chatService.guardarMensaje(mensaje);
    }

    this.mensaje = '';
  }

  validateMessage(message: string): boolean {
    const regex = new RegExp('^(?!\\s)(?!$).+');

    return regex.test(message);
  }
}

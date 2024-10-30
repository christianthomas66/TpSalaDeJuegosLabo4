import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { AuthService } from '../servicios/auth.service';
import * as moment from 'moment';
import { ChatService } from '../servicios/chat.service';
import { User } from '@firebase/auth';

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

    // this.messages.push({
    //   text: this.mensaje,
    //   fecha: new Date(),
    //   nombreUsuario: this.usuarioLogueado.email,
    //   type: 'right',
    // });

    // this.mensajes.push(mensaje);

    this.chatService.guardarMensaje(mensaje);
    this.mensaje = '';
  }
}
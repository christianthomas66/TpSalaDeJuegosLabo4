import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { AuthService } from '../servicios/auth.service';
import * as moment from 'moment';
import { ChatService } from '../servicios/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje : string='';
  mensajes : any[] = []
  usuarioLogueado : any;

  constructor(private auth : AuthService, private chatService : ChatService) 
  { 

    //Obtengo los mensajes de la coleccion
    this.chatService.obtenerMensajes().subscribe(mjs=>{
      this.mensajes = mjs;
    });
    if(this.mensajes == null){
      this.mensajes = []
    }

  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(usuario=>{
      this.usuarioLogueado = usuario;
    })
  }

  enviarMensaje()
  {
    let fecha = (moment(new Date())).format('DD-MM-YYYY HH:mm:ss');
    let mensaje =  {
      usuario:{
        id: this.usuarioLogueado.uid,
        email: this.usuarioLogueado.email,
      },
      texto:this.mensaje,
      fecha: fecha
    }
    // this.mensajes.push(mensaje);

    this.chatService.guardarMensaje(mensaje);
    this.mensaje = ""
  }
}

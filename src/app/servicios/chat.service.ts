import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  
  constructor(private angularFirestore : AngularFirestore) 
  {
  }

  obtenerMensajes()
  {
    console.log("obtener mensajes")
    let coleccion = this.angularFirestore.collection<any>('chats',ref=> ref.orderBy('fecha', 'asc').limit(25));
    return coleccion.valueChanges();
  }

  guardarMensaje(mensaje:any )
  {
    this.angularFirestore.collection<any>('chats').add(mensaje);
  }

}
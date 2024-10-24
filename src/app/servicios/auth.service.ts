import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth : AngularFireAuth, private firestore : AngularFirestore) 
  { }

  async logIn(email: string, contrasenia : string)
  {
     return await this.afauth.signInWithEmailAndPassword(email,contrasenia)
     .catch(error=>{
      throw(error);
      });
  }

  async register(email: string, contrasenia : string)
  {
    return await this.afauth.createUserWithEmailAndPassword(email,contrasenia)
    .catch(error=>{
      throw(error);
      });
  }

  getCurrentUser()
  {
    return this.afauth.authState;
  }

  logOut()
  {
    this.afauth.signOut();
  }

  sendUserLog(user : any){  
    return this.firestore.collection("userLogins").add(user);
  }

  sendUserResultado(nombre:string ,resultado : any){  
    return this.firestore.collection(nombre).add(resultado);
  }

  sendUserEncuesta(encuesta : any){  
    return this.firestore.collection("userEncuesta").add(encuesta);
  }







}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/clases/Usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  responseMessage : boolean | string =false;
  miUsuario : Usuario = new Usuario();

  constructor(private authService:AuthService,
              private router : Router,
             ) 
  {
  }

  ngOnInit(): void {
  }

  Registrar(){
      const {email,contrasenia} = this.miUsuario;
      this.authService.register(email,contrasenia)
      .then(res=>{
        console.log("Se registro el usuario",res);
        if(res !=null )
        {
          this.router.navigate(['home']);
        }
      })
      .catch(err =>{
        //this.responseMessage = err.message;
        switch(err.code)
        {
          case 'auth/email-already-in-use':
            this.responseMessage= 'Email ya registrado.';
            break;
          case 'auth/invalid-email':
            this.responseMessage= 'Email invalido.';
            break;       
          case 'auth/operation-not-allowed':
            this.responseMessage= 'Operacion no valido xd';
            break;      
          case 'auth/weak-password':
            this.responseMessage='La contrasenia debe tener al menos 6 caracteres'
            break; 
          case 'auth/internal-error':
            this.responseMessage='Vacios los campos'
            break;       
          default:
            this.responseMessage = 'Error';
            break;
        }
        console.log('Error en el registro A: ',err);
      });      
  }

  IrAlLogin(){
    this.router.navigate(['login']);
  }

}

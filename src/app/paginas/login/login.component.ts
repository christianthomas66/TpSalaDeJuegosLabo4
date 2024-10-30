import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/Usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  responseMessage: boolean | string = false;
  miUsuario: Usuario = new Usuario();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logUsuario() {
    let usuarioJson: any = {
      email: this.miUsuario.email,
      date: new Date(),
    };
    this.authService
      .sendUserLog(usuarioJson)
      .then((res) => {
        console.log('Usuario log subido correctamente.');
      })
      .catch((error) => {
        console.log('Error al subirlo el log usuario :(');
      });
  }

  Ingresar() {
    try {
      console.log(this.miUsuario);
      const { email, contrasenia } = this.miUsuario;
      this.authService
        .logIn(email, contrasenia)
        .then((res) => {
          console.log('Se logueo el usuario: ', res);
          if (res != null) {
            let usuarioJson: any = {
              email: this.miUsuario.email,
            };
            this.authService
              .sendUserLog(usuarioJson)
              .then((res) => {
                console.log('Usuario log subido correctamente.');
              })
              .catch((err) => {
                console.log('Error al subirlo el log usuario :(');
              });
            this.router.navigate(['home']);
          }
        })
        .catch((err) => {
          //this.responseMessage = err.message;
          switch (err.code) {
            case 'auth/invalid-email':
              this.responseMessage = 'Email invalido.';
              break;
            case 'auth/user-disabled':
              this.responseMessage = 'Usuario deshabilitado.';
              break;
            case 'auth/user-not-found':
              this.responseMessage = 'Usuario no encontrado.';
              break;
            case 'auth/wrong-password':
              this.responseMessage = 'Contrasenia incorrecta.';
              break;
            case 'auth/user-not-found':
              this.responseMessage = 'Usuario no encontrado.';
              break;
            default:
              this.responseMessage = 'Error';
          }
          console.log('Error en login.ts: ', err);
        });
    } catch (err) {
      console.log('Error ingresar', err);
    }
  }

  CompletarDatos(email: string, password: string, rol: string) {
    this.miUsuario.email = email;
    this.miUsuario.contrasenia = password;
    this.authService.rol = rol;
  }

  IrAlRegistro() {
    this.router.navigate(['registro']);
  }
}
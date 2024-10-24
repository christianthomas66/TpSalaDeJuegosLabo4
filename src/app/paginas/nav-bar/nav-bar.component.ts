import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/Usuario';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  usuarioLogueado = this.authService.getCurrentUser();
  estaLogueado : any = null;
  constructor(private authService:AuthService, private router: Router)
  {
    this.ObtenerUsuarioLogueado();
  }

  ngOnInit(): void {
    
  }

  ObtenerUsuarioLogueado()
  {
    this.authService.getCurrentUser().subscribe(res =>{
      console.log('obtener usuario log: '+ res?.email);
      this.estaLogueado = res ? true: false;
    })
  }

  CerrarSesion()
  {
    this.estaLogueado = false;
    this.authService.logOut();
  }




}

import { Component } from '@angular/core';
import { slideInAnimation } from './route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'TP-SalaDeJuegosLabIV-CT';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}

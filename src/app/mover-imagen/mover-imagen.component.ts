import { Component } from '@angular/core';

@Component({
  selector: 'app-mover-imagen',
  templateUrl: './mover-imagen.component.html',
  styleUrls: ['./mover-imagen.component.scss']
})
export class MoverImagenComponent  {
  private xDirection: number = 1;
  private yDirection: number = 1;
  private speed: number = 2; // Velocidad del rebote
  private intervalId: any;

  startBouncing() {
    const image = document.getElementById('moving-image');
    if (!image) return;

    // Reiniciar posición inicial
    image.style.left = '0px';
    image.style.top = '0px';

    // Detener cualquier animación anterior
    this.stopBouncing();

    // Iniciar el movimiento
    this.intervalId = setInterval(() => {
      const rect = image.getBoundingClientRect();
      const containerRect = image.parentElement?.getBoundingClientRect();

      // Mover la imagen
      const newX = rect.left + this.xDirection * this.speed;
      const newY = rect.top + this.yDirection * this.speed;

      // Comprobar límites
      if (newX + rect.width > containerRect!.right || newX < containerRect!.left) {
        this.xDirection *= -1; // Cambiar dirección en X
      }
      if (newY + rect.height > containerRect!.bottom || newY < containerRect!.top) {
        this.yDirection *= -1; // Cambiar dirección en Y
      }

      // Actualizar posición
      image.style.left = `${rect.left + this.xDirection * this.speed}px`;
      image.style.top = `${rect.top + this.yDirection * this.speed}px`;
    }, 16); // Aproximadamente 60fps
  }

  stopBouncing() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

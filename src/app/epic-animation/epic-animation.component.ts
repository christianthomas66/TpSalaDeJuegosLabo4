import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-epic-slide',
  templateUrl: './epic-slide.component.html',
  styleUrls: ['./epic-slide.component.css'],
})
export class EpicSlideComponent {
  @ViewChild('imgRef') imgRef!: ElementRef;

  constructor(private router: Router) {}

  slideAndRedirect() {
    const el = this.imgRef.nativeElement;
    el.classList.add('epic-slide');

    setTimeout(() => {
      this.router.navigate(['/otra-ruta']);
    }, 1000);
  }
}


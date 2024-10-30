import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss'],
})
export class RespuestasComponent implements OnInit {
  encuesta: any[] = [];

  constructor(private angularFirestore: AngularFirestore) {}

  ngOnInit(): void {
    this.angularFirestore;

    const coleccion = this.angularFirestore.collection<any>('userEncuesta');

    coleccion.valueChanges().subscribe((data) => {
      console.log(data);

      this.encuesta = data;
    });
  }
}

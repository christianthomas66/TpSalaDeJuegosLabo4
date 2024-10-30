import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {
  forma: FormGroup;
  mensaje: string = '';

  usuarioLog: any = {
    email: '',
    id: 0,
  };

  recomendar: Boolean = false;

  constructor(private fb: FormBuilder, private firebase: AuthService) {
    this.forma = this.fb.group({
      nombre: ['', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
      apellido: ['', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      sexo: ['', [Validators.required]],
    });

    firebase.getCurrentUser().subscribe((res) => {
      if (res != null) {
        this.usuarioLog.email = res.email;
        this.usuarioLog.id = res.uid;
      }
    });
  }

  ngOnInit(): void {}

  cambiarCheckbox() {
    this.recomendar = !this.recomendar;
  }

  obtenerDatosYEnviarEncuesta() {
    let { nombre, apellido, edad, sexo, telefono, recomendar } =
      this.forma.value;
    let encuesta = {
      nombre: nombre,
      apellido: apellido,
      sexo: sexo,
      edad: edad,
      telefono: telefono,
      recomendar: this.recomendar,
      email: this.usuarioLog.email,
      id: this.usuarioLog.id,
    };

    this.firebase
      .sendUserEncuesta(encuesta)
      .then((res) => {
        console.log('se mandaron(?');
        this.mensaje = 'Se mando la encuesta!👌';

        this.forma.reset();

        Swal.fire({
          title: 'Encuestas',
          text: 'Se mandaron los resultados de la encuenta con éxito!!!',
          icon: 'success',
        });
      })
      .catch((err) => {
        console.log('no se mando nada xd');
      });
  }
}
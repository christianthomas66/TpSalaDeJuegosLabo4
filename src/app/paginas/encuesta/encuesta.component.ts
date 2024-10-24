import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {


  forma : FormGroup;
  mensaje : string='';

  usuarioLog : any={
    email:'',
    id:0
  }
  

  constructor(private fb :FormBuilder, private firebase : AuthService) {

    this.forma = this.fb.group({
      'nombre':['',[Validators.required]],
      'apellido':['',[Validators.required]],
      'edad':['',[Validators.required, Validators.min(18), Validators.max(99)]],
      'telefono':['',[Validators.required, Validators.maxLength(10),Validators.minLength(10) ,Validators.pattern("^[0-9]*$")]],
      'sexo':['',[Validators.required]],
      'recomendar':['',[Validators.requiredTrue]],
    
    });

    firebase.getCurrentUser().subscribe(res=>{
      if(res!=null)
      {
        this.usuarioLog.email = res.email;
        this.usuarioLog.id = res.uid;
      }
    })

  }

  ngOnInit(): void {
  }


  
  obtenerDatosYEnviarEncuesta()
  {
    let {nombre,apellido,edad,sexo,telefono,recomendar}= this.forma.value;
    let encuesta ={
      nombre: nombre,
      apellido:apellido,
      sexo:sexo,
      edad:edad,
      telefono:telefono,
      recomendar:recomendar,
      email: this.usuarioLog.email,
      id: this.usuarioLog.id      
    }
    console.log(encuesta);
    this.firebase.sendUserEncuesta(encuesta).then(res=>{
      console.log('se mandaron(?');
      this.mensaje='Se mando la encuesta!👌';
      Swal.fire({
        title: "Encuestas",
        text: "Se mandaron los resultados de la encuenta con éxito!!!",
        icon: "success"
      });
    }).catch(err=>{
      console.log('no se mando nada xd')
    })
  }

}

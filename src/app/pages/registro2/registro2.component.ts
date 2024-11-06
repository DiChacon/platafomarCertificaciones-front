import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-registro2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registro2.component.html',
  styleUrl: './registro2.component.scss'
})
export class Registro2Component {
  registroForm = new FormGroup({
    username: new FormControl(),
    name: new FormControl(),
    app: new FormControl(),
    apm: new FormControl(),
    email: new FormControl(),
    institucion: new FormControl(),
    carrera: new FormControl(),
    password: new FormControl()
  });

  constructor(private registroService: RegistroService){

  }
  async registro(form: any){
    try {
      const data = await this.registroService.registro(form);
      if (data.ok) {
        console.log(data);
      
      } else {
        alert('los datos no son correctos');
      }
    } catch (error) {
      console.error('error',error);
    }
  }

}

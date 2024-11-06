import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-editar-pregunta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-pregunta.component.html',
  styleUrl: './editar-pregunta.component.scss'
})
export class EditarPreguntaComponent {
  agregarPreForm = new FormGroup({
    descripcion: new FormControl('', [Validators.required]), // Campo obligatorio
    a: new FormControl('', [Validators.required]), // Campo obligatorio
    b: new FormControl('', [Validators.required]), // Campo obligatorio
    c: new FormControl('', [Validators.required]), // Campo obligatorio
    d: new FormControl('', [Validators.required]), // Campo obligatorio
    correcta: new FormControl('', [Validators.required]) // Campo obligatorio
  });

  constructor(private router: Router, private preguntaService: PreguntaService ) {}
  goBack() {
    this.router.navigate(['inicio/admin-examen/admin-pregunta']);
  }
  async agregarPregunta(form: any){
    try {
      const data = await this.preguntaService.agregarPregunta(form);
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

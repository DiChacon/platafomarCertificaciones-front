import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-agregar-pregunta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './agregar-pregunta.component.html',
  styleUrl: './agregar-pregunta.component.scss'
})
export class AgregarPreguntaComponent {
  agregarPreForm = new FormGroup({
    descripcion: new FormControl('', [Validators.required]),
    a: new FormControl('', [Validators.required]),
    b: new FormControl('', [Validators.required]),
    c: new FormControl('', [Validators.required]),
    d: new FormControl('', [Validators.required]),
    correcta: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private preguntaService: PreguntaService) {}

  goBack() {
    this.router.navigate(['inicio/admin-examen/admin-pregunta']);
  }

  async agregarPregunta(form: any) {
    try {
      const data = await this.preguntaService.agregarPregunta(form);
      if (data.ok) {
        console.log('Pregunta creada:', data);
        this.goBack(); // Redirige a la lista después de guardar
      } else {
        alert('Los datos no son correctos');
      }
    } catch (error) {
      console.error('Error al guardar la pregunta:', error);
    }
  }
}

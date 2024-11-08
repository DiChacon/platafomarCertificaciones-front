import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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
export class EditarPreguntaComponent implements OnInit {
  agregarPreForm = new FormGroup({
    descripcion: new FormControl('', [Validators.required]),
    a: new FormControl('', [Validators.required]),
    b: new FormControl('', [Validators.required]),
    c: new FormControl('', [Validators.required]),
    d: new FormControl('', [Validators.required]),
    correcta: new FormControl('', [Validators.required])
  });

  id_pregunta: string | null = null;
  id_examen: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) {}

  ngOnInit() {
    this.id_pregunta = this.route.snapshot.paramMap.get('id_pregunta');
    if (this.id_pregunta) {
      this.cargarPregunta(this.id_pregunta);
    }
  }

  async cargarPregunta(id_pregunta: string) {
    try {
      const response = await this.preguntaService.obtenerPreguntaPorId(id_pregunta);
      if (response.ok) {
        this.id_examen = response.data.id_examen;
        this.agregarPreForm.patchValue({
          descripcion: response.data.descripcion,
          a: response.data.a,
          b: response.data.b,
          c: response.data.c,
          d: response.data.d,
          correcta: response.data.correcta
        });
      } else {
        console.error('Error al obtener la pregunta:', response.message);
      }
    } catch (error) {
      console.error('Error en la solicitud de pregunta:', error);
    }
  }

  goBack() {
    this.router.navigate(['inicio/admin-examen/admin-pregunta', { id_examen: this.id_examen}]);
  }

  async agregarPregunta(form: any) {
    try {
      if (this.id_pregunta) {
        // Actualizar pregunta existente
        const response = await this.preguntaService.actualizarPregunta(this.id_pregunta, form);
        if (response.ok) {
          console.log('Pregunta actualizada:', response.data);
          this.goBack();  // Redirige a la lista después de guardar
        } else {
          alert('Error al actualizar la pregunta.');
        }
      } else {
        // Crear nueva pregunta
        const response = await this.preguntaService.agregarPregunta(form);
        if (response.ok) {
          console.log('Pregunta creada:', response.data);
          this.goBack();  // Redirige a la lista después de guardar
        } else {
          alert('Los datos no son correctos');
        }
      }
    } catch (error) {
      console.error('Error al guardar la pregunta:', error);
    }
  }
}

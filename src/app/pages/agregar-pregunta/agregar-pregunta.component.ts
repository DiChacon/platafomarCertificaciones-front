import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  styleUrls: ['./agregar-pregunta.component.scss']
})
export class AgregarPreguntaComponent implements OnInit {
  agregarPreForm = new FormGroup({
    descripcion: new FormControl('', [Validators.required]),
    a: new FormControl('', [Validators.required]),
    b: new FormControl('', [Validators.required]),
    c: new FormControl('', [Validators.required]),
    d: new FormControl('', [Validators.required]),
    correcta: new FormControl('', [Validators.required])
  });

  id_examen: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) {}

  ngOnInit(): void {
    // Obtener el id_examen desde la URL
    this.id_examen = this.route.snapshot.paramMap.get('id_examen');
  }

  async agregarPregunta(form: any) {
    if (this.id_examen) {
      // Incluir el id_examen en los datos antes de enviarlos al backend
      const preguntaData = { ...form, id_examen: this.id_examen };
      try {
        const response = await this.preguntaService.agregarPregunta(preguntaData);
        if (response.ok) {
          console.log('Pregunta creada:', response.data);
          this.goBack(); // Redirigir al listado de preguntas del examen
        } else {
          alert('Error al agregar la pregunta');
        }
      } catch (error) {
        console.error('Error al guardar la pregunta:', error);
      }
    }
  }

  goBack() {
    // Redirige al listado de preguntas del examen actual
    if (this.id_examen) {
      this.router.navigate(['inicio/admin-examen/admin-pregunta', { id_examen: this.id_examen }]);
    }
  }
}

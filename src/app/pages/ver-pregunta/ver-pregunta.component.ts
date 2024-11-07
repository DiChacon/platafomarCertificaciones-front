// ver-pregunta.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-ver-pregunta',
  standalone: true,
  templateUrl: './ver-pregunta.component.html',
  styleUrls: ['./ver-pregunta.component.scss']
})
export class VerPreguntaComponent implements OnInit {
  pregunta: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) {}

  ngOnInit(): void {
    this.obtenerPregunta();
  }

  async obtenerPregunta() {
    const id_pregunta = this.route.snapshot.paramMap.get('id_pregunta'); // Toma el 'id' de la URL
    if (id_pregunta) {
      try {
        // Llama al servicio para obtener la pregunta con el ID
        const response = await this.preguntaService.obtenerPreguntaPorId(id_pregunta);
        if (response.ok) {
          this.pregunta = response.data;
        } else {
          console.error('No se pudo encontrar la pregunta');
        }
      } catch (error) {
        console.error('Error al cargar la pregunta:', error);
      }
    }
  }

  goBack() {
    this.router.navigate(['inicio/admin-examen/admin-pregunta']);
  }
}

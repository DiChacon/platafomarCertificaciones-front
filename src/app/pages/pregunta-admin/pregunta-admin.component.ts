import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalEliminarPreguntaComponent } from '../../components/modal-eliminar-pregunta/modal-eliminar-pregunta.component';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-pregunta-admin',
  standalone: true,
  imports: [CommonModule, ModalEliminarPreguntaComponent],
  templateUrl: './pregunta-admin.component.html',
  styleUrls: ['./pregunta-admin.component.scss']
})
export class PreguntaAdminComponent implements OnInit {
  questions: any[] = [];
  examId: string | null = null;
  isModalEliminarOpen = false;
  preguntaSeleccionadaId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private preguntaService: PreguntaService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del examen desde la ruta
    this.examId = this.route.snapshot.paramMap.get('id_examen');
    if (this.examId) {
      this.cargarPreguntasPorExamen(this.examId);
    }
  }

  // Método para obtener preguntas por ID de examen
  async cargarPreguntasPorExamen(id_examen: string) {
    try {
      const response = await this.preguntaService.obtenerPreguntasPorExamen(id_examen);
      if (response.ok) {
        this.questions = response.data;
      } else {
        console.error('Error al obtener las preguntas:', response.message);
      }
    } catch (error) {
      console.error('Error en la solicitud de preguntas:', error);
    }
  }

  viewQuestion(id_pregunta: string) {
    this.router.navigate(['inicio/admin-examen/admin-pregunta/ver-pregunta', { id_pregunta }]);
  }

  editQuestion(id_pregunta: string) {
    this.router.navigate(['inicio/admin-examen/admin-pregunta/editar-pregunta', { id_pregunta }]);
  }

  goToAgregarPregunta() {
    if (this.examId) {
      this.router.navigate(['inicio/admin-examen/admin-pregunta/agregar-pregunta', { id_examen: this.examId }]);
    }
  }

  openModalEliminar(id_pregunta: string) {
    this.preguntaSeleccionadaId = id_pregunta;
    this.isModalEliminarOpen = true;
  }

  async handleEliminarPregunta(confirmado: boolean) {
    this.isModalEliminarOpen = false;
    if (confirmado && this.preguntaSeleccionadaId) {
      try {
        const response = await this.preguntaService.borrarPregunta(this.preguntaSeleccionadaId);
        if (response.ok) {
          this.questions = this.questions.filter(q => q.id_pregunta !== this.preguntaSeleccionadaId);
          console.log("Pregunta eliminada");
        } else {
          console.error('Error al eliminar la pregunta:', response.message);
        }
      } catch (error) {
        console.error('Error en la eliminación de la pregunta:', error);
      } finally {
        this.preguntaSeleccionadaId = null;
      }
    }
  }
}

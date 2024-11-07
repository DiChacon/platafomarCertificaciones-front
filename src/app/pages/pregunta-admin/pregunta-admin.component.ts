import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalEliminarPreguntaComponent } from '../../components/modal-eliminar-pregunta/modal-eliminar-pregunta.component';
import { Router } from '@angular/router';
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
  isModalEliminarOpen = false;
  preguntaSeleccionadaId: string | null = null; // ID de la pregunta seleccionada

  constructor(private router: Router, private preguntaService: PreguntaService) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  async cargarPreguntas() {
    try {
      const response = await this.preguntaService.obtenerTodasLasPreguntas();
      console.log('Preguntas recibidas:', response);
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
    this.router.navigate(['inicio/admin-examen/admin-pregunta/agregar-pregunta']);
  }

  openModalEliminar(id_pregunta: string) {
    this.preguntaSeleccionadaId = id_pregunta; // Almacena el ID de la pregunta a eliminar
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
        this.preguntaSeleccionadaId = null; // Resetea el ID seleccionado
      }
    }
  }
}

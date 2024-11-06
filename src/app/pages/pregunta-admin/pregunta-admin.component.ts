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
  styleUrl: './pregunta-admin.component.scss'
})
export class PreguntaAdminComponent implements OnInit {
  questions: any[] = [];

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

  viewQuestion() {
    this.router.navigate(['inicio/admin-examen/admin-pregunta/ver-pregunta']);
  }

  editQuestion() {
    this.router.navigate(['inicio/admin-examen/admin-pregunta/editar-pregunta']);
  }

  isModalEliminarOpen = false;

  openModalEliminar() {
    this.isModalEliminarOpen = true;
  }

  handleEliminarPregunta(confirmado: boolean) {
    this.isModalEliminarOpen = false;
    if (confirmado) {
      console.log("Pregunta eliminada");
    }
  }
}

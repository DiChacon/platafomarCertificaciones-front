import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalAgregarExamenComponent } from "../../components/modal-agregar-examen/modal-agregar-examen.component";
import { Router } from '@angular/router';
import { ModalEliminarExamenComponent } from '../../components/modal-eliminar-examen/modal-eliminar-pregunta.component';
import { ExamenService } from '../../services/examen.service';

@Component({
  selector: 'app-examen-admin',
  standalone: true,
  imports: [CommonModule, ModalAgregarExamenComponent, ModalEliminarExamenComponent],
  templateUrl: './examen-admin.component.html',
  styleUrls: ['./examen-admin.component.scss']
})
export class ExamenAdminComponent implements OnInit {
  exams: any[] = [];
  isModalAgregarOpen = false;
  isModalEliminarOpen = false;
  examenSeleccionadoId: string | null = null;
  examenSeleccionadoNombre: string = '';

  constructor(
    private router: Router,
    private examenService: ExamenService
  ) {}

  ngOnInit() {
    this.obtenerExamenes();
  }

  async obtenerExamenes() {
    try {
      const response = await this.examenService.obtenerTodosLosExamenes();
      this.exams = response.data.map((examen: any) => ({
        number: examen.id_examen,
        title: examen.nombre_examen,
        lastModified: examen.updatedAt || 'No disponible'
      }));
    } catch (error) {
      console.error('Error al obtener los exámenes:', error);
    }
  }

  // Navegar a la página de visualización del examen
  viewExam(id_examen: number) {
    this.router.navigate(['inicio/admin-examen/ver-examen', { id: id_examen }]);
  }

  // Navegar a la página de edición de preguntas del examen
  editExam(id_examen: number) {
    this.router.navigate(['inicio/admin-examen/admin-pregunta', { id_examen }]);
  }

  openModalAgregar() {
    this.isModalAgregarOpen = true;
  }

  closeModalAgregar() {
    this.isModalAgregarOpen = false;
    this.obtenerExamenes(); // Refrescar la lista después de agregar un examen
  }

  openModalEliminar(id_examen: string, nombre_examen: string) {
    this.examenSeleccionadoId = id_examen;
    this.examenSeleccionadoNombre = nombre_examen;
    this.isModalEliminarOpen = true;
  }

  async handleEliminarExamen(confirmado: boolean) {
    this.isModalEliminarOpen = false;
    if (confirmado && this.examenSeleccionadoId) {
      try {
        const response = await this.examenService.borrarExamen(this.examenSeleccionadoId);
        if (response.ok) {
          this.exams = this.exams.filter(exam => exam.number !== this.examenSeleccionadoId);
        } else {
          console.error('Error al eliminar el examen:', response.message);
        }
      } catch (error) {
        console.error('Error al eliminar el examen:', error);
      }
    }
    this.examenSeleccionadoId = null;
  }
}

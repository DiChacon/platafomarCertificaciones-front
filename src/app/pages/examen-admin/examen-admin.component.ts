import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalAgregarExamenComponent } from "../../components/modal-agregar-examen/modal-agregar-examen.component";
import { Router } from '@angular/router';
import { ModalEliminarExamenComponent } from '../../components/modal-eliminar-examen/modal-eliminar-pregunta.component';
import { ExamenService } from '../../services/examen.service'; // Importar el servicio de exámenes

@Component({
  selector: 'app-examen-admin',
  standalone: true,
  imports: [CommonModule, ModalAgregarExamenComponent, ModalEliminarExamenComponent],
  templateUrl: './examen-admin.component.html',
  styleUrl: './examen-admin.component.scss'
})
export class ExamenAdminComponent implements OnInit {
  exams: any[] = []; // Definir `exams` para almacenar los exámenes desde la base de datos
  
  constructor(private router: Router, private examenService: ExamenService) {} // Inyectar ExamenService

  ngOnInit() {
    this.obtenerExamenes();
  }

  async obtenerExamenes() {
    try {
      const response = await this.examenService.obtenerTodosLosExamenes();
      console.log(response)
      // Asegura que response.data es un arreglo antes de mapearlo
      this.exams = response.data.map((examen: any) => ({
        number: examen.id_examen,
        title: examen.nombre_examen,
        lastModified: examen.updatedAt || 'No disponible' // Actualiza esto según la propiedad real de fecha si existe
      }));
    } catch (error) {
      console.error('Error al obtener los exámenes:', error);
    }
  }

  // Método para navegar a la página de visualización del examen
  viewExam() {
    this.router.navigate(['inicio/admin-examen/ver-examen']);
  }

  editExam() {
    this.router.navigate(['inicio/admin-examen/admin-pregunta']);
  }

  isModalAgregarOpen = false;
  isModalEliminarOpen = false;

  openModalAgregar() {
    this.isModalAgregarOpen = true;
  }

  closeModalAgregar() {
    this.isModalAgregarOpen = false;
  }

  openModalEliminar() {
    this.isModalEliminarOpen = true;
  }

  handleEliminarExamen(confirmado: boolean) {
    this.isModalEliminarOpen = false;
    if (confirmado) {
      console.log("Examen eliminado");
    }
  }
}

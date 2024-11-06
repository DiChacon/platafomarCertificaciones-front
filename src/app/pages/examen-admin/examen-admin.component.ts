import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalAgregarExamenComponent } from "../../components/modal-agregar-examen/modal-agregar-examen.component";
import { Router } from '@angular/router';
import { ModalEliminarExamenComponent } from '../../components/modal-eliminar-examen/modal-eliminar-pregunta.component';

@Component({
  selector: 'app-examen-admin',
  standalone: true,
  imports: [CommonModule, ModalAgregarExamenComponent, ModalEliminarExamenComponent],
  templateUrl: './examen-admin.component.html',
  styleUrl: './examen-admin.component.scss'
})
export class ExamenAdminComponent {
  exams = [
    { number: '#001', title: 'Vex Robótica II', lastModified: '05/01/2024' },
    { number: '#002', title: 'Vex Robótica II', lastModified: '05/01/2024' },
    { number: '#003', title: 'Vex Robótica II', lastModified: '06/01/2024' },
    { number: '#004', title: 'Vex Robótica II', lastModified: '07/01/2024' }
  ];
  constructor(private router: Router) {}

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
      // Lógica para eliminar la pregunta seleccionada
      console.log("examen eliminado");
    }
  }

}

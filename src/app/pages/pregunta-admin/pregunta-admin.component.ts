import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalEliminarPreguntaComponent } from '../../components/modal-eliminar-pregunta/modal-eliminar-pregunta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta-admin',
  standalone: true,
  imports: [CommonModule, ModalEliminarPreguntaComponent],
  templateUrl: './pregunta-admin.component.html',
  styleUrl: './pregunta-admin.component.scss'
})
export class PreguntaAdminComponent {
  questions = [
    { number: '#001', question: '¿Este es un ejemplo de pregunta estándar?', correctAnswer: 'b) Llantas' },
    { number: '#002', question: '¿Este es un ejemplo de pregunta estándar?', correctAnswer: 'c) VEX U' },
    { number: '#003', question: '¿Este es un ejemplo de pregunta estándar?', correctAnswer: 'a) Competencia' },
    { number: '#004', question: '¿Este es un ejemplo de pregunta estándar?', correctAnswer: 'b) Cerebro' }
  ];
  constructor(private router: Router) {}

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
      // Lógica para eliminar la pregunta seleccionada
      console.log("Pregunta eliminada");
    }
  }
}

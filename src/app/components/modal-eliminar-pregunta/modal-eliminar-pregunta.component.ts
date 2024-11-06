import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-eliminar-pregunta',
  standalone: true,
  imports: [],
  templateUrl: './modal-eliminar-pregunta.component.html',
  styleUrl: './modal-eliminar-pregunta.component.scss'
})
export class ModalEliminarPreguntaComponent {
  @Output() onClose = new EventEmitter<boolean>();

  cancelar() {
    this.onClose.emit(false); // Emitir falso para cancelar
  }

  aceptar() {
    this.onClose.emit(true); // Emitir verdadero para confirmar
  }
}

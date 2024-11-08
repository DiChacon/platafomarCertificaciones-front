import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-eliminar-examen',
  standalone: true,
  templateUrl: './modal-eliminar-pregunta.component.html',
  styleUrls: ['./modal-eliminar-pregunta.component.scss']
})
export class ModalEliminarExamenComponent {
  @Input() examenNombre: string = '';
  @Output() onClose = new EventEmitter<boolean>();

  cancelar() {
    this.onClose.emit(false);
  }

  aceptar() {
    this.onClose.emit(true);
  }
}

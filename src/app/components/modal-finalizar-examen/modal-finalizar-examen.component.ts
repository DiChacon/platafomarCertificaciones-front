import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-finalizar-examen',
  standalone: true,
  imports: [],
  templateUrl: './modal-finalizar-examen.component.html',
  styleUrl: './modal-finalizar-examen.component.scss'
})
export class ModalFinalizarExamenComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() openNextModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onAccept() {
    this.closeModal.emit(); // Cierra el modal actual
    this.openNextModal.emit(); // Emite un evento para abrir el siguiente modal
  }
}

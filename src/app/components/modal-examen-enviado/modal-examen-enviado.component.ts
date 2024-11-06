import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-examen-enviado',
  standalone: true,
  imports: [],
  templateUrl: './modal-examen-enviado.component.html',
  styleUrl: './modal-examen-enviado.component.scss'
})
export class ModalExamenEnviadoComponent {
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
}

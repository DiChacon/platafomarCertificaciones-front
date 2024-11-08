import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() certificado: any;
  currentDate: string = '';

  ngOnInit() {
    this.currentDate = new Date().toISOString().split('T')[0];
    console.log('Datos recibidos en el modal:', this.certificado);
  }

  close() {
    this.closeModal.emit();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-agregar-examen',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './modal-agregar-examen.component.html',
  styleUrl: './modal-agregar-examen.component.scss'
})
export class ModalAgregarExamenComponent {
  agregarForm = new FormGroup({
    nombre_examen: new FormControl('', [Validators.required])
  });
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  constructor(private examenService: ExamenService){

  }
  async agregarExamen(form: any){
    try {
      const data = await this.examenService.crearExamen(form);
      if (data.ok) {
        console.log(data);
      
      } else {
        alert('los datos no son correctos');
      }
    } catch (error) {
      console.error('error',error);
    }
  }

}

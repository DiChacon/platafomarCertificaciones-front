import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificadoService } from '../../services/certificado.service';
import { ModalComponent } from "../../components/modal/modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validador',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent, CommonModule],
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.scss']
})
export class ValidadorComponent {
  validadorForm = new FormGroup({
    folio: new FormControl('', [Validators.required]),
  });
  
  isModalOpen = false;
  certificado: any = null;

  constructor(private certificadoService: CertificadoService) {}

  openModal() {
    console.log('Certificado:', this.certificado);
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async validador(form: any) {
    try {
      const data = await this.certificadoService.validador(form);
      if (data.ok && data.data.length > 0) {
        this.certificado = data.data[0]; // Asigna el primer elemento del array
        console.log('Certificado encontrado:', this.certificado);
        this.openModal();
      } else {
        alert('Certificado no encontrado');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al validar el certificado');
    }
  }
  
}

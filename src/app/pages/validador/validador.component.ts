import { Component } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificadoService } from '../../services/certificado.service';

@Component({
  selector: 'app-validador',
  standalone: true,
  imports: [
    ModalComponent, 
    CommonModule, 
    ReactiveFormsModule,],
  templateUrl: './validador.component.html',
  styleUrl: './validador.component.scss'
})
export class ValidadorComponent {
  validadorForm = new FormGroup({
    folio: new FormControl('', [Validators.required]),
  });
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  constructor(private certificadoService: CertificadoService){

  }
  async validador(form: any){
    try {
      const data = await this.certificadoService.validador(form);
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

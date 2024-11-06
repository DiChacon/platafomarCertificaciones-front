import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalFinalizarExamenComponent } from '../../components/modal-finalizar-examen/modal-finalizar-examen.component';
import { ModalExamenEnviadoComponent } from '../../components/modal-examen-enviado/modal-examen-enviado.component';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [
    ModalFinalizarExamenComponent,
    ModalExamenEnviadoComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent {
  isFinalizarModalOpen = false;
  isExamenEnviadoModalOpen = false;

  // FormGroup para la pregunta y opciones
  preguntaForm = new FormGroup({
    respuestaSeleccionada: new FormControl('', [Validators.required]) // Campo obligatorio
  });

  openFinalizarModal() {
    if (this.preguntaForm.invalid) {
      this.preguntaForm.get('respuestaSeleccionada')?.markAsTouched();
      return;
    }
    this.isFinalizarModalOpen = true;
  }

  closeFinalizarModal() {
    this.isFinalizarModalOpen = false;
  }

  openExamenEnviadoModal() {
    this.isExamenEnviadoModalOpen = true;
  }

  closeExamenEnviadoModal() {
    this.isExamenEnviadoModalOpen = false;
  }

  onSubmit() {
    if (this.preguntaForm.invalid) {
      this.preguntaForm.get('respuestaSeleccionada')?.markAsTouched();
      return;
    }
    console.log('Respuesta seleccionada:', this.preguntaForm.value.respuestaSeleccionada);
    // Lógica para avanzar a la siguiente pregunta o acción
  }
}

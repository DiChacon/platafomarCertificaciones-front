import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent {
  examenForm = new FormGroup({
    aceptarTerminos: new FormControl(false, [Validators.requiredTrue]) // Campo obligatorio con validación
  });

  constructor(private router: Router) {}

  iniciarExamen() {
    if (this.examenForm.invalid) {
      this.examenForm.get('aceptarTerminos')?.markAsTouched();
      return;
    }
    // Navegar a la ruta '/preguntas'
    this.router.navigate(['inicio/examen/preguntas']);
    console.log('Examen iniciado y redirigiendo a /preguntas');
  }
}

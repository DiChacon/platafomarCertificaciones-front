import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-pregunta',
  standalone: true,
  imports: [],
  templateUrl: './ver-pregunta.component.html',
  styleUrl: './ver-pregunta.component.scss'
})
export class VerPreguntaComponent {
  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['inicio/admin-examen/admin-pregunta']);
  }
}

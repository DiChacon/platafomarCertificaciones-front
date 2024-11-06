import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CertificacionesAprobadasComponent } from '../../components/certificaciones-aprobadas/certificaciones-aprobadas.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CertificacionesAprobadasComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  constructor(private router: Router) {}

  goToExamen() {
    this.router.navigate(['/inicio/examen']);
  }
}

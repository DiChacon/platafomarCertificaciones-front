import { Component } from '@angular/core';
import { CertificacionesAprobadasComponent } from '../../components/certificaciones-aprobadas/certificaciones-aprobadas.component';

@Component({
  selector: 'app-certificaciones-page',
  standalone: true,
  imports: [CertificacionesAprobadasComponent],
  templateUrl: './certificaciones-page.component.html',
  styleUrl: './certificaciones-page.component.scss'
})
export class CertificacionesPageComponent {

}

import { Component, OnInit } from '@angular/core';
import { CertificadoService } from '../../services/certificado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificaciones-aprobadas',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './certificaciones-aprobadas.component.html',
  styleUrls: ['./certificaciones-aprobadas.component.scss']
})
export class CertificacionesAprobadasComponent implements OnInit {
  certificados: any[] = [];

  constructor(private certificadoService: CertificadoService) {}

  async ngOnInit(): Promise<void> {
    const userId = localStorage.getItem('usuarioId');
    if (userId) {
      await this.cargarCertificados(userId);
    }
  }

  // Método para cargar certificados por usuario
  async cargarCertificados(userId: string) {
    try {
      const response = await this.certificadoService.obtenerCertificadosPorUsuario(userId);
      if (response && response.ok) {
        this.certificados = response.data;
      } else {
        console.error('Error al obtener certificados:', response?.message || 'Sin mensaje de error');
      }
    } catch (error) {
      console.error('Error al cargar certificados:', error);
    }
  }
}

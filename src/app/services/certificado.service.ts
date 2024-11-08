import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  public url: string;

  constructor(private httpClient:HttpClient) { 
    this.url = environment.API_URL;
  }
   // metodo obtener certificados por ID de usuario
   async obtenerCertificadosPorUsuario(idUsuario: string): Promise<any> {
    try {
      const res = await this.httpClient.get(`${this.url}/buscar?id_usuario=${idUsuario}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al obtener certificados:', error);
      throw error;
    }
  }
  async validador(data: any): Promise<any> {
    try {
      // Realiza la solicitud GET al backend con el folio como query parameter
      const res: any = await this.httpClient.get(`${this.url}/folio?folio=${data.folio}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al validar el certificado:', error);
      throw error;
    }
  }
// Método para borrar un certificado
async borrarCertificado(certificadoId: number): Promise<any> {
  try {
    const res = await this.httpClient.delete(`${this.url}/certificados/${certificadoId}`).toPromise();
    return res;
  } catch (error) {
    console.error('Error al borrar el certificado:', error);
    throw error;
  }
}

// Método para actualizar un certificado
async actualizarCertificado(certificadoId: number, data: any): Promise<any> {
  try {
    const res: any = await this.httpClient.put(`${this.url}/certificados/${certificadoId}`, data).toPromise();
    return res;
  } catch (error) {
    console.error('Error al actualizar el certificado:', error);
    throw error;
  }
}
}

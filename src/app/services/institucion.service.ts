import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  public url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.API_URL;
  }
    // Método para obtener todas las instituciones
    async obtenerInstituciones(): Promise<any> {
      try {
        const res = await this.httpClient.get(`${this.url}/find_instituciones`).toPromise();
        return res;
      } catch (error) {
        console.error('Error al obtener las instituciones:', error);
        throw error;
      }
    }

    async obtenerInstitucionPorId(id_institucion: number): Promise<any> {
      try {
        const res = await this.httpClient.get(`${this.url}/find_inst?id_institucion=${id_institucion}`).toPromise();
        return res;
      } catch (error) {
        console.error('Error al obtener la institución por ID:', error);
        throw error;
      }
    }

  // Método para crear una nueva institución
  async crearInstitucion(data: any): Promise<any> {
    try {
      const res = await this.httpClient.post(`${this.url}/instituciones`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al crear la institución:', error);
      throw error;
    }
  }

  // Método para actualizar una institución
  async actualizarInstitucion(institucionId: number, data: any): Promise<any> {
    try {
      const res = await this.httpClient.put(`${this.url}/instituciones/${institucionId}`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al actualizar la institución:', error);
      throw error;
    }
  }

  // Método para borrar una institución
  async borrarInstitucion(institucionId: number): Promise<any> {
    try {
      const res = await this.httpClient.delete(`${this.url}/instituciones/${institucionId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al borrar la institución:', error);
      throw error;
    }
  }
}

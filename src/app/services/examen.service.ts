import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  public url: string;

  constructor(private httpClient: HttpClient) { 
    this.url = environment.API_URL;
  }
  async obtenerExamenConPreguntas(id: number) {
    try {
      const res: any = await this.httpClient.get(`${this.url}/find_examenPreguntas/${id}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al obtener el examen con preguntas:', error);
      throw error;
    }
  }
  // Método para obtener todos los exámenes
  async obtenerTodosLosExamenes(): Promise<any> {
    try {
      const res = await this.httpClient.get(`${this.url}/find_examenes`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al obtener todos los exámenes:', error);
      throw error;
    }
  }

  async crearExamen(data: any): Promise<any> {
    try {
      const res = await this.httpClient.post(`${this.url}/create_examen`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al crear el examen:', error);
      throw error;
    }
  }

  async borrarExamen(examenId: string): Promise<any> {
    try {
      const res: any = await this.httpClient.delete(`${this.url}/delete_examen/${examenId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al borrar el examen:', error);
      throw error;
    }
  }

  async actualizarExamen(examenId: string, data: any): Promise<any> {
    try {
      const res: any = await this.httpClient.put(`${this.url}/examenes/${examenId}`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al actualizar el examen:', error);
      throw error;
    }
  }

  async obtenerExamenPorCurso(cursoId: string): Promise<any> {
    try {
      const res: any = await this.httpClient.get(`${this.url}/cursos/${cursoId}/examen`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al obtener el examen del curso:', error);
      throw error;
    }
  }
}

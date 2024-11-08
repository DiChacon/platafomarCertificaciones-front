import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  public url: string;

  constructor(private httpClient:HttpClient) { 
    this.url = environment.API_URL;
  }

  async obtenerPreguntaPorId(id_pregunta: string): Promise<any> {
    try {
      // Realiza una solicitud GET para obtener la pregunta por ID
      const res = await this.httpClient.get(`${this.url}/find_pregunta?id_pregunta=${id_pregunta}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al obtener la pregunta:', error);
      throw error;
    }
  }

    // Método para obtener todas las preguntas
    async obtenerTodasLasPreguntas(): Promise<any> {
      try {
        const res = await this.httpClient.get(`${this.url}/find_preguntas`).toPromise();
        return res;
      } catch (error) {
        console.error('Error al obtener todas las preguntas:', error);
        throw error;
      }
    }
    async obtenerPreguntasPorExamen(id_examen: string): Promise<any> {
      try {
        const res: any = await this.httpClient.get(`${this.url}/find_preguntasExamen/${id_examen}`).toPromise();
        return res;
      } catch (error) {
        console.error('Error al obtener preguntas por examen:', error);
        throw error;
      }
    }
    // Metodo para agregar pregunta
    async agregarPregunta(data: any) {
      const res: any = await this.httpClient.post(this.url + '/create_pregunta', data).toPromise();
      return res;
    }
    // Método para borrar una pregunta
    async borrarPregunta(preguntaId: string): Promise<any> {
      try {
        const res: any = await this.httpClient.delete(`${this.url}/delete_pregunta/${preguntaId}`).toPromise();
        return res;
      } catch (error) {
        console.error('Error al borrar la pregunta:', error);
        throw error;
      }
    }

  // Método para actualizar una pregunta existente
  async actualizarPregunta(id: string, data: any): Promise<any> {
    return await this.httpClient.put(`${this.url}/update_pregunta/${id}`, data).toPromise();
  }

}

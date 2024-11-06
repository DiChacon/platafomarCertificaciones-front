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
   // metodo obtener todas las preguntas de un examen específico
   async obtenerPreguntasPorExamen(examenId: string) {
    try {
      const res: any = await this.httpClient.get(`${this.url}/examenes/${examenId}/preguntas`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al obtener las preguntas del examen:', error);
      throw error;
    }
  }
  // metodo para agregar una pregunta
  async agregarPregunta(data: any){
    const res: any = await this.httpClient.post(this.url+'/agregarPregunta',data).toPromise();
    return res;
}
  // Método para borrar una pregunta
  async borrarPregunta(preguntaId: string): Promise<any> {
    try {
      const res: any = await this.httpClient.delete(`${this.url}/preguntas/${preguntaId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al borrar la pregunta:', error);
      throw error;
    }
  }

  // Método para actualizar una pregunta 
  async actualizarPregunta(preguntaId: string, data: any): Promise<any> {
    try {
      const res: any = await this.httpClient.put(`${this.url}/preguntas/${preguntaId}`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error);
      throw error;
    }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  public url: string;

  constructor(private httpClient:HttpClient) { 
    this.url = environment.API_URL;
  }
    // metodo para obtener todos los examenes
    async obtenerTodosLosCertificados(): Promise<any> {
      try {
        const res = await this.httpClient.get(`${this.url}/examen`).toPromise();
        return res;
      } catch (error) {
        console.error('Error al obtener todos los certificados:', error);
        throw error;
      }
    }
    //metodo para crear el examen
  async crearExamen(data: any){
    const res: any = await this.httpClient.post(this.url+'/crearExamen',data).toPromise();
    return res;
}
  // Método para borrar un examen
  async borrarExamen(examenId: string): Promise<any> {
    try {
      const res: any = await this.httpClient.delete(`${this.url}/examenes/${examenId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al borrar el examen:', error);
      throw error;
    }
  }
    // Método para actualizar un examen
    async actualizarExamen(examenId: string, data: any): Promise<any> {
      try {
        const res: any = await this.httpClient.put(`${this.url}/examenes/${examenId}`, data).toPromise();
        return res;
      } catch (error) {
        console.error('Error al actualizar el examen:', error);
        throw error;
      }
    }
      // Método para obtener un examen de un curso específico
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

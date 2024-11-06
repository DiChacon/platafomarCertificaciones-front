import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.API_URL;
  }

  // Método para obtener un resultado por su ID
  async obtenerResultado(resultId: number): Promise<any> {
    try {
      const res = await this.httpClient.get(`${this.url}/resultados/${resultId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al obtener el resultado:', error);
      throw error;
    }
  }

  // Método para agregar un nuevo resultado
  async agregarResultado(data: any): Promise<any> {
    try {
      const res = await this.httpClient.post(`${this.url}/resultados`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al agregar el resultado:', error);
      throw error;
    }
  }

  // Método para actualizar un resultado
  async actualizarResultado(resultId: number, data: any): Promise<any> {
    try {
      const res = await this.httpClient.put(`${this.url}/resultados/${resultId}`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al actualizar el resultado:', error);
      throw error;
    }
  }

  // Método para borrar un resultado
  async borrarResultado(resultId: number): Promise<any> {
    try {
      const res = await this.httpClient.delete(`${this.url}/resultados/${resultId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al borrar el resultado:', error);
      throw error;
    }
  }
}

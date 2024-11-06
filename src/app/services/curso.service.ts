import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  public url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.API_URL;
  }
    // Método para obtener todos los cursos
    async obtenerTodosLosCursos(): Promise<any> {
      try {
        const res = await this.httpClient.get(`${this.url}/find_cursos`).toPromise();
        return res;
      } catch (error) {
        console.error('Error al obtener todos los cursos:', error);
        throw error;
      }
    }

  // Método para obtener un curso por su ID
  async obtenerCurso(cursoId: number): Promise<any> {
    try {
      const res = await this.httpClient.get(`${this.url}/cursos/${cursoId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al obtener el curso:', error);
      throw error;
    }
  }

  // Método para crear un nuevo curso
  async crearCurso(data: any): Promise<any> {
    try {
      const res = await this.httpClient.post(`${this.url}/cursos`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al crear el curso:', error);
      throw error;
    }
  }

  // Método para actualizar un curso
  async actualizarCurso(cursoId: number, data: any): Promise<any> {
    try {
      const res = await this.httpClient.put(`${this.url}/cursos/${cursoId}`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
      throw error;
    }
  }

  // Método para borrar un curso
  async borrarCurso(cursoId: number): Promise<any> {
    try {
      const res = await this.httpClient.delete(`${this.url}/cursos/${cursoId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al borrar el curso:', error);
      throw error;
    }
  }
}

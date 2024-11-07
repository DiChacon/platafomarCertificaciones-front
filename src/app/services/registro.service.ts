import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  public url: string;

  constructor(private httpClient:HttpClient) { 
    this.url = environment.API_URL;
  }
  async registro(data: any){
    const res: any = await this.httpClient.post(this.url+'/create_user',data).toPromise();
    return res;
}
  // Método para actualizar un usuario específico
  async actualizarUsuario(usuarioId: string, data: any): Promise<any> {
    try {
      const res: any = await this.httpClient.put(`${this.url}/usuarios/${usuarioId}`, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
  }

  // Método para borrar un usuario específico
  async borrarUsuario(usuarioId: string): Promise<any> {
    try {
      const res: any = await this.httpClient.delete(`${this.url}/usuarios/${usuarioId}`).toPromise();
      return res;
    } catch (error) {
      console.error('Error al borrar el usuario:', error);
      throw error;
    }
  }
}

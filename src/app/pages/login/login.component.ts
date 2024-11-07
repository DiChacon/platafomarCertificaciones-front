import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { InstitucionService } from '../../services/institucion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private loginService: LoginService,
    private institucionService: InstitucionService,
    private router: Router
  ) {}

  async login(form: any) {
    try {
      const data = await this.loginService.login(form);
      if (data.ok) {
        const nombreUsuario = data.data.nombre || 'Nombre no disponible';
        
        // Obtener el nombre de la institución
        const institucionData: any = await this.institucionService.obtenerInstitucionPorId(data.data.institucion);
        const nombreInstitucion = institucionData.ok ? institucionData.data.nombre_inst : 'Institución no disponible';
        
        // Guardar en localStorage
        localStorage.setItem('nombreUsuario', nombreUsuario);
        localStorage.setItem('institucionUsuario', nombreInstitucion);

        console.log('Login exitoso:', data);
        this.router.navigate(['/inicio']); // Redirige a /inicio en caso de éxito
      } else {
        alert('Los datos no son correctos');
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }
}

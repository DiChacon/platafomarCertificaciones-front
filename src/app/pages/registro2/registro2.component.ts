import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';
import { InstitucionService } from '../../services/institucion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro2',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './registro2.component.html',
  styleUrls: ['./registro2.component.scss']
})
export class Registro2Component implements OnInit {
  registroForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    app: new FormControl('', [Validators.required]),
    apm: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    institucion: new FormControl('', [Validators.required]),
    carrera: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  instituciones: any[] = []; // Lista de instituciones

  constructor(
    private registroService: RegistroService,
    private institucionService: InstitucionService
  ) {}

  ngOnInit() {
    this.cargarInstituciones();
  }

  // Cargar instituciones desde el servicio
  async cargarInstituciones() {
    try {
      const data = await this.institucionService.obtenerInstituciones();
      if (data.ok) {
        this.instituciones = data.data;
      } else {
        console.error('Error al cargar las instituciones:', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud de instituciones:', error);
    }
  }

  passwordsNoCoinciden(): boolean {
    const password = this.registroForm.get('password')?.value;
    const confirmPassword = this.registroForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }

  async registro(form: any) {
    if (this.passwordsNoCoinciden()) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const data = await this.registroService.registro(form);
      if (data.ok) {
        alert('Usuario registrado exitosamente');
        this.registroForm.reset(); // Limpiar el formulario
      } else {
        alert('Los datos no son correctos');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Ocurrió un error al registrar el usuario. Inténtelo nuevamente.');
    }
  }
}

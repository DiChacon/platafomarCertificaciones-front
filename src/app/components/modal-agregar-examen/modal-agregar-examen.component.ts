import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';
import { CursoService } from '../../services/curso.service'; // Importa el servicio de cursos
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-agregar-examen',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-agregar-examen.component.html',
  styleUrl: './modal-agregar-examen.component.scss'
})
export class ModalAgregarExamenComponent implements OnInit {
  agregarForm = new FormGroup({
    nombre_examen: new FormControl('', [Validators.required]),
    curso_id: new FormControl('', [Validators.required]) // Campo para seleccionar el curso
  });

  cursos: any[] = []; // Propiedad para almacenar los cursos
  @Output() closeModal = new EventEmitter<void>();

  constructor(private examenService: ExamenService, private cursoService: CursoService) { }

  ngOnInit() {
    this.cargarCursos(); // Carga los cursos al iniciar
  }

  onClose() {
    this.closeModal.emit();
  }

  // Método para cargar los cursos desde el servicio
  async cargarCursos() {
    try {
      const data = await this.cursoService.obtenerTodosLosCursos();
      if (data.ok) {
        this.cursos = data.data;
      } else {
        console.error('Error al cargar los cursos:', data.message);
      }
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
    }
  }

  async agregarExamen(form: any) {
    try {
      const data = await this.examenService.crearExamen(form); // Envia nombre_examen y curso_id
      if (data.ok) {
        console.log(data);
        this.onClose();
      } else {
        alert('Los datos no son correctos');
      }
    } catch (error) {
      console.error('Error al agregar el examen:', error);
    }
  }
}

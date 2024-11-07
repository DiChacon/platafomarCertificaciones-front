import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';
import { CursoService } from '../../services/curso.service';
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
    id_curso: new FormControl('', [Validators.required])
  });

  cursos: any[] = [];
  @Output() closeModal = new EventEmitter<void>();

  constructor(private examenService: ExamenService, private cursoService: CursoService) { }

  ngOnInit() {
    this.cargarCursos();
  }

  onClose() {
    this.closeModal.emit();
  }

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
      const data = await this.examenService.crearExamen(form);
      if (data.ok) {
        console.log(data);
        this.onClose();
        window.location.reload(); // Recargar la página automáticamente después de agregar
      } else {
        alert('Los datos no son correctos');
      }
    } catch (error) {
      console.error('Error al agregar el examen:', error);
    }
  }
}

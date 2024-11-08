import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from '../../services/examen.service';

interface ExamenResponse {
  ok: boolean;
  data: {
    nombre_examen: string;
    preguntas: {
      id_pregunta: number;
      descripcion: string;
      a: string;
      b: string;
      c: string;
      d: string;
      correcta: string;
    }[];
  };
}

@Component({
  selector: 'app-ver-examen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.scss']
})
export class VerExamenComponent implements OnInit {
  examTitle: string = '';
  examQuestions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService
  ) {}

  ngOnInit() {
    const examId = this.route.snapshot.paramMap.get('id');
    if (examId) {
      this.obtenerExamenConPreguntas(parseInt(examId, 10));
    }
  }

  async obtenerExamenConPreguntas(id: number) {
    try {
      const response: ExamenResponse = await this.examenService.obtenerExamenConPreguntas(id);
      console.log('Datos recibidos:', response);

      if (response && response.ok && response.data) {
        this.examTitle = response.data.nombre_examen;
        this.examQuestions = response.data.preguntas.map((pregunta) => ({
          number: pregunta.id_pregunta,
          question: pregunta.descripcion,
          a: pregunta.a || 'N/A',
          b: pregunta.b || 'N/A',
          c: pregunta.c || 'N/A',
          d: pregunta.d || 'N/A',
          correctAnswer: pregunta.correcta || 'N/A'
        }));
      }
    } catch (error) {
      console.error('Error al obtener el examen:', error);
    }
  }
}

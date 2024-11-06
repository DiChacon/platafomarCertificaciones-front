import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ver-examen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-examen.component.html',
  styleUrl: './ver-examen.component.scss'
})
export class ExamenPreguntasComponent {
  examQuestions = [
    {
      number: '#001',
      question: '¿Este es un ejemplo de pregunta estándar?',
      answers: [
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra'
      ],
      
 
correctAnswer: 'b) Llantas'
    },
    {
      number: '#002',
      question: '¿Este es un ejemplo de pregunta estándar?',
      answers: [
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra'
      ],
      correctAnswer: 'c) VEX U'
    },
    {
      
  
number: '#003',
      question: '¿Este es un ejemplo de pregunta estándar?',
      answers: [
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra',
        'Respuesta aleatoria solo de muestra'
      ],
      correctAnswer: 'a) Competencia'
    },
  ];
}
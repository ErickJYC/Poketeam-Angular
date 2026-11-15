
import { Component } from '@angular/core';

@Component({
  selector: 'app-personaje',
  imports: [],
  templateUrl: './personaje.html',
  styleUrl: './personaje.css'
})
export class Personaje {
  nombre: string;
  energia: number;
  nivel: number;
  mensaje: string;

  constructor() {
    this.nombre = 'Pikachu';
    this.energia = 50;
    this.nivel = 1;
    this.mensaje = 'El personaje está listo';
  }

  entrenar(): void {
    if (this.energia >= 10) {
      this.energia -= 10;
      this.nivel += 1;
      this.mensaje = 'Entrenamiento completado. Subiste al nivel ' + this.nivel;
    } else {
      this.mensaje = 'No tienes suficiente energía para entrenar.';
    }
  }

  descansar(): void {
    if (this.energia < 100) {
      this.energia = Math.min(this.energia + 20, 100);
      this.mensaje = 'Has descansado. Energía actual: ' + this.energia;
    } else {
      this.mensaje = 'La energía ya está al máximo.';
    }
  }

  saludar(): void {
    this.mensaje = 'Hola, soy ' + this.nombre + ' y estoy en el nivel ' + this.nivel;
  }

  reiniciar(): void {
    this.energia = 50;
    this.nivel = 1;
    this.mensaje = 'El personaje está listo';
  }
}

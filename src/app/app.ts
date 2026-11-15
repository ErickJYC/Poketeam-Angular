import { Component, signal } from '@angular/core';
import { Personaje } from './components/personaje/personaje';
import { MiPokemon } from './components/mi-pokemon/mi-pokemon';

@Component({
  selector: 'app-root',
  imports: [Personaje, MiPokemon],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tarjeta-personaje');
}
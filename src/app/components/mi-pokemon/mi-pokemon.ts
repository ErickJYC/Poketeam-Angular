
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pokemon as PokemonService } from '../../services/pokemon';

import type {
  Pokemon as PokemonInfo,
  TipoPokemon,
  HabilidadPokemon,
  EfectividadTipo
} from '../../models/pokemon';

@Component({
  selector: 'app-mi-pokemon',
  imports: [FormsModule],
  templateUrl: './mi-pokemon.html',
  styleUrl: './mi-pokemon.css',
})
export class MiPokemon {

  private pokemonService = inject(PokemonService);

  nombre = '';
  pokemon: PokemonInfo | null = null;

  tiposPokemon: TipoPokemon[] = [];
  habilidadesPokemon: HabilidadPokemon[] = [];
  efectividades: EfectividadTipo[] = [];
  
  // Equipo de Pokémon seleccionados
  equipo: PokemonInfo[] = [];

  // Agregar el Pokémon buscado al equipo
  agregarAlEquipo() {

    if (!this.pokemon) {
      return;
    }

    if (this.equipo.length >= 6) {
      this.error = 'Tu equipo ya tiene 6 Pokémon';
      return;
    }

    const existe = this.equipo.some(
      (pokemon) => pokemon.id === this.pokemon!.id
    );

    if (existe) {
      this.error = 'Este Pokémon ya está en tu equipo';
      return;
    }

    this.equipo.push(this.pokemon);
    this.error = '';
  }

  // Eliminar un Pokémon del equipo
  eliminarDelEquipo(id: number) {
    this.equipo = this.equipo.filter(
      (pokemon) => pokemon.id !== id
    );
  }


  // Sumar las estadísticas base de un Pokémon
  calcularTotalEstadisticas(pokemon: PokemonInfo): number {

    return pokemon.estadisticas.reduce(
      (total, estadistica) => total + estadistica.valor,
      0
    );

  }


  // Calcular las debilidades y resistencias combinadas
  calcularEfectividades(tipos: TipoPokemon[]): EfectividadTipo[] {

    const multiplicadores = new Map<string, number>();

    // Revisar cada tipo del Pokémon
    for (const tipo of tipos) {

      // Ataques que causan el doble de daño
      for (const debilidad of tipo.debilidades) {
        multiplicadores.set(
          debilidad,
          (multiplicadores.get(debilidad) ?? 1) * 2
        );
      }

      // Ataques que causan la mitad de daño
      for (const resistencia of tipo.resistencias) {
        multiplicadores.set(
          resistencia,
          (multiplicadores.get(resistencia) ?? 1) * 0.5
        );
      }

      // Ataques que no causan daño
      for (const inmunidad of tipo.inmunidades) {
        multiplicadores.set(inmunidad, 0);
      }
    }

    return Array.from(
      multiplicadores,
      ([tipoAtaque, multiplicador]) => ({
        tipoAtaque,
        multiplicador
      })
    ).sort(
      (a, b) => b.multiplicador - a.multiplicador
    );
  }


  error = '';
  cargando = false;

  async buscarPokemon() {

    this.error = '';
    this.pokemon = null;
    this.tiposPokemon = [];
    this.efectividades = [];
    this.habilidadesPokemon = [];

    if (!this.nombre.trim()) {
      this.error = 'Escribe el nombre o ID de un Pokémon';
      return;
    }

    this.cargando = true;

    try {

      // ENDPOINT 1: Consultar Pokémon
      const pokemon = await this.pokemonService.getPokemonById(
        this.nombre
      );

      // ENDPOINT 2: Consultar sus tipos
      const tipos = await Promise.all(
        pokemon.tipos.map(
          (tipo) => this.pokemonService.getTipoPokemon(tipo)
        )
      );

      // ENDPOINT 3: Consultar sus habilidades
      const habilidades = await Promise.all(
        pokemon.habilidades.map(
          (habilidad) =>
            this.pokemonService.getHabilidadPokemon(habilidad)
        )
      );

      this.pokemon = pokemon;
      this.tiposPokemon = tipos;
      this.habilidadesPokemon = habilidades;
      this.efectividades = this.calcularEfectividades(tipos);

    } catch (error) {
      this.error = 'No se pudo completar la consulta del Pokémon';
      console.error(error);

    } finally {
      this.cargando = false;
    }
  }
}

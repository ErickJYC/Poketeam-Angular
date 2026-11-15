
import { Service } from '@angular/core';

import {
  Pokemon as PokemonInfo,
  TipoPokemon,
  HabilidadPokemon
} from '../models/pokemon';

@Service()
export class Pokemon {

  // ENDPOINT 1: Buscar un Pokémon
  public async getPokemonById(nombre: string): Promise<PokemonInfo> {

    const clave = nombre.trim().toLowerCase();

    if (!clave) {
      throw new Error('Escribe un nombre de Pokémon válido');
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${clave}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al obtener el Pokémon: ${response.status}`);
    }

    const data = await response.json();

    const pokemon: PokemonInfo = {
      id: data.id,
      nombre: data.name,

      tipos: data.types.map(
        (typeInfo: any) => typeInfo.type.name
      ),

      imagen: data.sprites.front_default,

      habilidades: data.abilities.map(
        (abilityInfo: any) => abilityInfo.ability.name
      ),

      estadisticas: data.stats.map(
        (statInfo: any) => ({
          nombre: statInfo.stat.name,
          valor: statInfo.base_stat
        })
      )
    };

    return pokemon;
  }

  // ENDPOINT 2: Consultar un tipo Pokémon
  public async getTipoPokemon(nombre: string): Promise<TipoPokemon> {

    const clave = nombre.trim().toLowerCase();

    if (!clave) {
      throw new Error('Escribe un tipo válido');
    }

    const url = `https://pokeapi.co/api/v2/type/${clave}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No se encontró el tipo: ${clave}`);
    }

    const data = await response.json();

    const tipo: TipoPokemon = {
      nombre: data.name,

      debilidades: data.damage_relations.double_damage_from.map(
        (item: { name: string }) => item.name
      ),

      resistencias: data.damage_relations.half_damage_from.map(
        (item: { name: string }) => item.name
      ),

      inmunidades: data.damage_relations.no_damage_from.map(
        (item: { name: string }) => item.name
      )
    };

    return tipo;
  }

  // ENDPOINT 3: Consultar una habilidad Pokémon
  public async getHabilidadPokemon(nombre: string): Promise<HabilidadPokemon> {

    const clave = nombre.trim().toLowerCase();

    if (!clave) {
      throw new Error('Escribe una habilidad válida');
    }

    const url = `https://pokeapi.co/api/v2/ability/${clave}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No se encontró la habilidad: ${clave}`);
    }

    const data = await response.json();

    // Buscar la descripción de la habilidad en inglés
    const descripcion = data.effect_entries.find(
      (item: any) => item.language.name === 'en'
    );

    const habilidad: HabilidadPokemon = {
      nombre: data.name,
      efecto: descripcion?.short_effect
        ?? 'No hay una descripción disponible'
    };

    return habilidad;
  }
}


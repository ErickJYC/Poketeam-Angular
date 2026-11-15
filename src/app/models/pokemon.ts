
export interface Pokemon {
  id: number;
  nombre: string;
  tipos: string[];
  imagen: string | null;

  habilidades: string[];
  estadisticas: EstadisticaPokemon[];
}

export interface EstadisticaPokemon {
  nombre: string;
  valor: number;
}


export interface TipoPokemon {
  nombre: string;
  debilidades: string[];
  resistencias: string[];
  inmunidades: string[];
}


export interface HabilidadPokemon {
  nombre: string;
  efecto: string;
}


export interface EfectividadTipo {
  tipoAtaque: string;
  multiplicador: number;
}

/**
 * Action Types
 */
export enum PokemonsTypes {
  LOAD_REQUEST = '@pokemons/LOAD_REQUEST',
  LOAD_SUCCESS = '@pokemons/LOAD_SUCCESS',
  LOAD_FAILURE = '@pokemons/LOAD_FAILURE',

  POKEMON_REQUEST = '@pokemons/POKEMON_REQUEST',
  POKEMON_SUCCESS = '@pokemons/POKEMON_SUCCESS',
  POKEMON_FAILURE = '@pokemons/POKEMON_FAILURE',

  TYPES_REQUEST = '@pokemons/TYPES_REQUEST',
  TYPES_SUCCESS = '@pokemons/TYPES_SUCCESS',
  TYPES_FAILURE = '@pokemons/TYPES_FAILURE',

  TYPE_REQUEST = '@pokemons/TYPE_REQUEST',
  TYPE_SUCCESS = '@pokemons/TYPE_SUCCESS',
  TYPE_FAILURE = '@pokemons/TYPE_FAILURE',

  OPEN_MODAL = '@pokemons/OPEN_MODAL',
  SET_OFFSET_LIMIT = '@pokemons/SET_OFFSET_LIMIT',
  SET_MODE_TYPE = '@pokemons/SET_MODE_TYPE',
}

/**
 * Data Types
 */

export interface IPokemon {
  url: string;
  name: string;
}

export interface AbilityProps {
  name: string;
}

export interface TypeProps {
  name: string;
}

export interface StatisticProps {
  base_stat: string;
  stat: string;
}
/**
 * State type
 */

export interface IPokemonsState {
  readonly results: IPokemon[];
  readonly error: boolean;
  readonly loading: boolean;
  readonly isOpenModal: boolean;
  readonly count: number;
  readonly offset: number;
  readonly limit: number;

  readonly typeList: TypeProps[];
  readonly modeType: boolean;

  readonly loadingGetPokemon: boolean;
  readonly name: string;
  readonly imageUrl: string;
  readonly types: TypeProps[];
  readonly abilities: AbilityProps[];
  readonly statistics: StatisticProps[];
}

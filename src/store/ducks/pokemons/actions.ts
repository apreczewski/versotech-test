import { action } from "typesafe-actions";
import { Action } from "redux";
import { PokemonsTypes } from "./types";

export const loadRequest = (data: any): Action =>
  action(PokemonsTypes.LOAD_REQUEST, { data });

export const loadSuccess = (data: any): Action =>
  action(PokemonsTypes.LOAD_SUCCESS, { data });

export const loadFailure = (): Action =>
  action(PokemonsTypes.LOAD_FAILURE);

export const pokemonRequest = (data: any): Action =>
  action(PokemonsTypes.POKEMON_REQUEST, { data });

export const pokemonSuccess = (data: any): Action =>
  action(PokemonsTypes.POKEMON_SUCCESS, { data });

export const pokemonFailure = (): Action =>
  action(PokemonsTypes.POKEMON_FAILURE);

export const typesRequest = (): Action =>
  action(PokemonsTypes.TYPES_REQUEST);

export const typesSuccess = (data: any): Action =>
  action(PokemonsTypes.TYPES_SUCCESS, { data });

export const typesFailure = (): Action =>
  action(PokemonsTypes.TYPES_FAILURE);

export const typeRequest = (data: any): Action =>
  action(PokemonsTypes.TYPE_REQUEST, { data });

export const typeSuccess = (data: any): Action =>
  action(PokemonsTypes.TYPE_SUCCESS, { data });

export const typeFailure = (): Action =>
  action(PokemonsTypes.TYPE_FAILURE);

export const setOffsetLimit = (data?: any): Action =>
  action(PokemonsTypes.SET_OFFSET_LIMIT, { data });

export const openModal = (): Action =>
  action(PokemonsTypes.OPEN_MODAL);

export const setModeType = (): Action =>
  action(PokemonsTypes.SET_MODE_TYPE);

import { all, call, put, takeLatest } from "redux-saga/effects";

import { api } from "../../../services";
import {
  loadSuccess,
  setOffsetLimit,
  loadFailure,
  pokemonSuccess,
  pokemonFailure,
  typesSuccess,
  typesFailure,
  typeFailure,
  typeSuccess,
  setModeType,
} from "./actions";
import { PokemonsTypes } from "./types";

export function* load(data?: any): Generator {
  const { offset, limit } = data.payload.data;

  try {
    if (offset >= 0) {
      const response: any = yield call(
        api.get,
        `/pokemon?offset=${offset}&limit=${limit}`
      );

      console.log("response.data: ", response.data);

      yield put(loadSuccess(response.data));

      yield put(setOffsetLimit({ offset, limit }));
    }
  } catch (err) {
    yield put(loadFailure());
  }
}

export function* getPokemon(data?: any): Generator {
  const { name } = data.payload.data;

  try {
    const response: any = yield call(api.get, `/pokemon/${name}`);

    const { abilities, types, sprites, stats } = response.data;

    const newAbilities = abilities.map((item: any) => item.ability.name);
    const newTypes = types.map((item: any) => item.type.name);
    const newStats = stats.map((item: any) => {
      return { base_stat: item.base_stat, stat: item.stat.name };
    });

    const pokemonData = {
      name,
      imageUrl: sprites.front_default,
      abilities: newAbilities,
      types: newTypes,
      statistics: newStats,
    };

    yield put(pokemonSuccess(pokemonData));
  } catch (err) {
    yield put(pokemonFailure());
  }
}

export function* getTypes(): Generator {
  try {
    const response: any = yield call(api.get, "/type");

    const { results } = response.data;

    yield put(typesSuccess({ typeList: results }));
  } catch (err) {
    yield put(typesFailure());
  }
}

export function* getType(data: any): Generator {
  console.log("...data: ", data);
  const { type } = data.payload.data;

  try {
    const response: any = yield call(api.get, `/type/${type}`);

    const { pokemon: list } = response.data;

    console.log("response.data: ", response.data);

    const newList = list.map((item: any) => {
      return item.pokemon;
    });

    console.log("response newList: ", newList);

    yield put(typeSuccess({ pokemon: newList, qtty: list.length }));

    yield put(setModeType());
  } catch (err) {
    yield put(typeFailure());
  }
}

export default all([
  takeLatest(PokemonsTypes.LOAD_REQUEST, load),
  takeLatest(PokemonsTypes.POKEMON_REQUEST, getPokemon),
  takeLatest(PokemonsTypes.TYPES_REQUEST, getTypes),
  takeLatest(PokemonsTypes.TYPE_REQUEST, getType),
]);

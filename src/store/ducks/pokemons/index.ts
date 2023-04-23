import { Reducer } from "redux";
import { IPokemonsState, PokemonsTypes } from "./types";

const INITIAL_STATE: IPokemonsState = {
  results: [],
  error: false,
  loading: false,
  isOpenModal: false,
  count: 0,
  offset: 0,
  limit: 20,

  typeList: [],
  modeType: false,

  loadingGetPokemon: false,
  name: "",
  imageUrl: "",
  types: [],
  abilities: [],
  statistics: [],
};

const reducer: Reducer<IPokemonsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PokemonsTypes.LOAD_REQUEST:
      return { ...state, loading: true };

    case PokemonsTypes.LOAD_SUCCESS:
      const { results, count } = action.payload.data;

      return {
        ...state,
        loading: false,
        error: false,
        results,
        count,
      };

    case PokemonsTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        results: [],
        isOpenModal: false,
        count: 0,
        offset: 0,
        limit: 20,
      };

    case PokemonsTypes.POKEMON_REQUEST:
      return { ...state, loadingGetPokemon: true };

    case PokemonsTypes.POKEMON_SUCCESS:
      const { name, imageUrl, types, abilities, statistics } =
        action.payload.data;

      return {
        ...state,
        loadingGetPokemon: false,
        error: false,
        name,
        imageUrl,
        types,
        abilities,
        statistics,
      };

    case PokemonsTypes.POKEMON_FAILURE:
      return {
        ...state,
        loadingGetPokemon: false,
        error: true,
        name: "",
        imageUrl: "",
        types: [],
        abilities: [],
        statistics: [],
      };

    case PokemonsTypes.TYPES_REQUEST:
      return { ...state, loading: true };

    case PokemonsTypes.TYPES_SUCCESS:
      const { typeList } = action.payload.data;

      return {
        ...state,
        loading: false,
        error: false,
        typeList,
      };

    case PokemonsTypes.TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        typeList: [],
      };

      case PokemonsTypes.TYPE_REQUEST:
        return { ...state, loading: true };

      case PokemonsTypes.TYPE_SUCCESS:
        const { pokemon, qtty } = action.payload.data;

        return {
          ...state,
          loading: false,
          error: false,
          results: pokemon,
          count: qtty,
        };

      case PokemonsTypes.TYPE_FAILURE:
        return {
          ...state,
          loading: false,
          error: true,
          results: state.results,
        };

    case PokemonsTypes.SET_OFFSET_LIMIT:
      const { offset, limit } = action.payload.data;

      return {
        ...state,
        offset,
        limit,
      };

    case PokemonsTypes.OPEN_MODAL:
      return { ...state, isOpenModal: !state.isOpenModal };

    case PokemonsTypes.SET_MODE_TYPE:
      return { ...state, modeType: !state.modeType };

    default:
      return state;
  }
};

export default reducer;

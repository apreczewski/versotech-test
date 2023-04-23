import { connect } from "react-redux";

import { Dispatch, bindActionCreators } from "redux";
import { IAppGlobalState } from "../../store";
import * as PokemonsActions from "../../store/ducks/pokemons/actions";

type ItemProps = {
  loading: boolean;
  url: string;
  name: string;
  openModal: () => void;
  pokemonRequest: (data: any) => void
};

const Item = ({ loading, url, name, openModal, pokemonRequest }: ItemProps) => {
  const index = url.split("/")[6];

  const getPokemon = (nameCurrent: string) => {
    console.log("nameCurrent: ", nameCurrent)
    pokemonRequest({ name: nameCurrent })
  }

  return (
    <>
      {loading && (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-auto justify-center items-center space-y-6 py-1">
              <div className="h-5 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <button
          type="button"
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          onClick={() => { openModal(); getPokemon(name);}}
        >
          <div className="flex-shrink-0">
            <p className="truncate text-sm text-gray-500">{index}</p>
          </div>
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{name}</p>
            </div>
          </div>
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state: IAppGlobalState) => ({
  loading: state.pokemons.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PokemonsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Item);

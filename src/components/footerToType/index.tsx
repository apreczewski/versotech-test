import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IAppGlobalState } from "../../store";
import * as PokemonsActions from "../../store/ducks/pokemons/actions";

type PaginationProps = {
  count: number;
  limit: number;
  loadRequest: (data: { offset: number; limit: number }) => void;
  setModeType: () => void;
};

const Pagination = ({ count, limit, loadRequest, setModeType }: PaginationProps) => {

  const exitModeType = () => {
    setModeType();
    loadRequest({ offset: 0, limit });
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-amber-600 px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-around">
        <div>
          <p className="flex text-sm text-gray-700">
            Showing <span className="font-medium ml-1 sm:mx-1">{count}</span>
            <span className="hidden font-medium sm:block"> ATIVED MODE TYPE</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              className="relative inline-flex items-center rounded-md px-2 py-2 bg-red-500 text-white ring-1 ring-inset ring-gray-300 hover:bg-red-700 focus:z-20 focus:outline-offset-0"
              onClick={exitModeType}
            >
              Exit Mode Type
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppGlobalState) => ({
  count: state.pokemons.count,
  limit: state.pokemons.limit,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PokemonsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

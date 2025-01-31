import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IAppGlobalState } from "../../store";
import * as PokemonsActions from "../../store/ducks/pokemons/actions";


type PaginationProps = {
  count: number;
  offset: number;
  limit: number;
  loadRequest: (data: { offset: number; limit: number }) => void;
};

const Pagination = ({ count, offset, limit, loadRequest }: PaginationProps) => {
  const amountItems = 20;

  type OffLimProps = {
    off: number;
  };

  const previous = ({ off }: OffLimProps) => {
    loadRequest({ offset: off, limit });
  };

  const next = ({ off }: OffLimProps) => {
    loadRequest({ offset: off, limit });
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() =>
                previous({
                  off: (offset - amountItems),
                })
              }
        >
          Previous
        </button>
        <button
          type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() =>
                next({
                  off: (offset + amountItems),
                })
              }
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{offset + 1}</span> to{" "}
              <span className="font-medium">{limit + offset}</span> of{" "}
              <span className="font-medium">{count}</span> results
            </p>
          </>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() =>
                previous({
                  off: (offset - amountItems),
                })
              }
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() =>
                next({
                  off: (offset + amountItems),
                })
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppGlobalState) => ({
  count: state.pokemons.count,
  offset: state.pokemons.offset,
  limit: state.pokemons.limit,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PokemonsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

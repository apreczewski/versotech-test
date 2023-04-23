import { Component, RefObject, createRef } from "react";
import { Disclosure } from "@headlessui/react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { v4 as uuid } from "uuid";

import { IAppGlobalState } from "../../store";
import { IPokemon, TypeProps } from "../../store/ducks/pokemons/types";
import * as PokemonsActions from "../../store/ducks/pokemons/actions";

import Pagination from "../../components/Pagination";
import Item from "../../components/item";
import Modal from "../../components/modal";
import FooterToType from "../../components/footerToType";

interface IDispatchProps {
  loadRequest: (data: { offset: number; limit: number }) => void;
  typesRequest: () => void;
  typeRequest: (data: { type: string }) => void;
}

interface DashboardProps {
  modeType: boolean;
  results: IPokemon[];
  typeList: TypeProps[];
  offset: number;
  limit: number;
  loading: boolean;
}

type Props = DashboardProps & IDispatchProps;

class Dashboard extends Component<Props> {
  minhaReferencia: RefObject<HTMLSelectElement>;

  constructor(props: Props) {
    super(props);
    this.minhaReferencia = createRef();
  }

  componentDidMount() {
    const { offset, limit, loadRequest, typesRequest } = this.props;
    loadRequest({ offset, limit });
    typesRequest();
  }

  handleSubmitTYpe = () => {
    const { typeRequest } = this.props;
    if (this.minhaReferencia.current) {
      const valorSelecionado = this.minhaReferencia.current.value;

      console.log("search: ", valorSelecionado);
      typeRequest({ type: valorSelecionado });
    }
  };

  render() {
    const { results, typeList, modeType } = this.props;

    return (
      <>
        <Disclosure as="nav" className="bg-gray-800 fixed w-screen z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
              </div>
              <div className="flex justify-center items-end w-full lg:ml-6 lg:justify-end">
                {!modeType && (
                  <div className="flex justify-center items-end w-full lg:max-w-xs lg:items-center">
                    <label
                      htmlFor="location"
                      className="hidden w-full text-sm text-right mr-3 font-medium leading-8 text-gray-400 lg:block"
                    >
                      Search by type
                    </label>
                    <label
                      htmlFor="location"
                      className="clock w-full text-sm text-right mr-3 font-medium leading-8 text-gray-400 lg:hidden"
                    >
                      Search
                    </label>
                    <select
                      id="typePokemon"
                      name="typePokemon"
                      ref={this.minhaReferencia}
                      className="block w-fit h-8 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {typeList &&
                        typeList.map((item) => {
                          return <option key={uuid()}>{item.name}</option>;
                        })}
                    </select>
                    <button
                      type="submit"
                      className="rounded-md ml-3 h-8 border-0 pl-3 pr-3 sm:text-sm sm:leading-6 text-white bg-blue-700 border-blue-700 hover:bg-blue-800  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={this.handleSubmitTYpe}
                    >
                      Go
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Disclosure>
        {results && (
          <div className="grid grid-cols-1 gap-4 py-20 px-5 sm:grid-cols-3">
            {results.map(({ name, url }: IPokemon) => (
              <Item key={uuid()} name={name} url={url} />
            ))}
          </div>
        )}
        <Disclosure
          as="footer"
          className="bg-gray-800 fixed bottom-0 w-screen z-10"
        >
          {!modeType && (<Pagination />)}
          {modeType && (<FooterToType />)}
        </Disclosure>
        <Modal />
      </>
    );
  }
}

const mapStateToProps = (state: IAppGlobalState) => ({
  modeType: state.pokemons.modeType,
  results: state.pokemons.results,
  typeList: state.pokemons.typeList,
  offset: state.pokemons.offset,
  limit: state.pokemons.limit,
  loading: state.pokemons.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PokemonsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

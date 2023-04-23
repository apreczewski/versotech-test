import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { v4 as uuid } from "uuid";

import { IAppGlobalState } from "../../store";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as PokemonsActions from "../../store/ducks/pokemons/actions";
import {
  AbilityProps,
  StatisticProps,
  TypeProps,
} from "../../store/ducks/pokemons/types";

type ModalProps = {
  isOpenModal: boolean;
  loading: boolean;
  name: string;
  imageUrl: string;
  types: TypeProps[];
  abilities: AbilityProps[];
  statistics: StatisticProps[];
  openModal: () => void;
};

function Modal({
  isOpenModal,
  loading,
  name,
  imageUrl,
  types,
  abilities,
  statistics,
  openModal,
}: ModalProps) {

  return (
    <>
      {!loading && (
        <Transition.Root show={isOpenModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={openModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                      <div className="flex flex-1 flex-col p-8">
                        <img
                          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                          src={imageUrl}
                          alt=""
                        />
                        <h2 className="mt-6 text-sm font-medium text-gray-900">
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </h2>

                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                          <dt className="sr-only">types</dt>
                          <dd className="text-sm text-gray-500">
                            {types.map((type) => {
                              return (
                                <span className="ml-1" key={uuid()}>
                                  {` • ${type}`}
                                </span>
                              );
                            })}
                          </dd>
                        </dl>

                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                          <dt className="sr-only">abilities</dt>
                          <dd className="mt-3">
                            {abilities &&
                              abilities.map((item) => {
                                return (
                                  <span
                                    key={uuid()}
                                    className="inline-flex items-center rounded-full ml-1 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                  >
                                    {`${item}`}
                                  </span>
                                );
                              })}
                          </dd>
                        </dl>

                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                          <dt className="sr-only">statistics</dt>
                          <dd className="mt-3">
                            {statistics &&
                              statistics.map((item) => {
                                return (
                                  <span
                                    key={uuid()}
                                    className="inline-flex items-center rounded-full ml-1 mb-1 bg-green-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
                                  >
                                    {`${item.base_stat} • ${item.stat}`}
                                  </span>
                                );
                              })}
                          </dd>
                        </dl>
                      </div>
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                          <button
                            type="button"
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                            onClick={openModal}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}

const mapStateToProps = (state: IAppGlobalState) => ({
  isOpenModal: state.pokemons.isOpenModal,
  loading: state.pokemons.loadingGetPokemon,
  name: state.pokemons.name,
  imageUrl: state.pokemons.imageUrl,
  types: state.pokemons.types,
  abilities: state.pokemons.abilities,
  statistics: state.pokemons.statistics,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PokemonsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

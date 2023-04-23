import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { IPokemonsState } from './ducks/pokemons/types';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSagas';

export interface IAppGlobalState {
  pokemons: IPokemonsState;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<IAppGlobalState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;

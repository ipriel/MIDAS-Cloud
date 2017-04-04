import '@ngrx/core/src/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { isDevMode } from '@angular/core';

import { compose } from '@ngrx/core';
import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import { RouterState, routerReducer } from '@ngrx/router-store';

import { State as AuthState, authReducer } from './auth';
import { State as UserState, userReducer } from './user';

export { AuthEffects } from './auth';
export { UserEffects } from './user';

export interface State {
  auth: AuthState;
  user: UserState;
  router: RouterState;
}

const reducers = {
  auth: authReducer,
  user: userReducer,
  router: routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (isDevMode()) {
    return developmentReducer(state, action);
  }
  else {
    return productionReducer(state, action);
  }
}
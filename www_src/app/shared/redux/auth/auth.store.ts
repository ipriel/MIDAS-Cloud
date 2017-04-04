import '@ngrx/core/src/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Actions, ActionTypes } from './auth.actions';
import { safeAction } from '../shared/util';


export interface State {
  token: string;
  authenticated: boolean;
  newUser: boolean;
  err: Error;
};

const initialState: State = {
  token: null,
  authenticated: false,
  newUser: false,
  err: null
};

export function authReducer (state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS: {
      return safeAction(action, state, (payload, state) => {
        state.token = payload;
        state.authenticated = true;
        state.err = null;
        return state;
      });
    }

    case ActionTypes.AUTH_FAIL: {
      return safeAction(action, state, (payload, state) => {
        state.token = null;
        state.authenticated = false;
        state.err = payload;
        return state;
      });
    }

    case ActionTypes.CLEAR_AUTH: {
      return safeAction(action, state, (payload, state) => {
        state.token = null;
        state.authenticated = false;
        state.newUser = false;
        state.err = null;
        return state;
      });
    }

    case ActionTypes.TOGGLE_ACTION: {
      return safeAction(action, state, (payload, state) => {
        state.newUser = !state.newUser;
        return state;
      });
    }

    default: {
      return state;
    }
  }
}
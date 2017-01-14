import '@ngrx/core/src/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Actions, ActionTypes } from './auth.actions';


export interface State {
  token: string | null;
  authenticated: boolean;
  err: Error | null;
};

const initialState: State = {
  token: null,
  authenticated: false,
  err: null
};

export function authReducer (state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS: {
      return {
        token: action.payload as string,
        authenticated: true,
        err: null
      };
    }

    case ActionTypes.AUTH_FAIL: {
      return {
        token: null,
        authenticated: false,
        err: action.payload as Error
      };
    }

    default: {
      return state;
    }
  }
}

export class AuthBase {
  static getToken = function(state$: Observable<State>) {
    return state$.select(state => state.token);
  }

  static getStatus = function(state$: Observable<State>) {
    return state$.select(state => state.authenticated);
  }

  static getError = function(state$: Observable<State>) {
    return state$.select(state => state.err);
  }
}
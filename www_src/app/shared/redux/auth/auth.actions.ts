import { Action } from '@ngrx/store';
import { type } from '../shared/util';

export const ActionTypes = {
  AUTH_SUCCESS: type('Auth Success'),
  AUTH_FAIL: type('Auth Fail'),
  LOGIN: type('Login'),
  LOGOUT: type('Logout')
};

export class AuthSuccessAction implements Action {
  type = ActionTypes.AUTH_SUCCESS;

  constructor(public payload: string) { }
}

export class AuthFailAction implements Action {
  type = ActionTypes.AUTH_FAIL;

  constructor(public payload: Error) { }
}

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: any) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = 
  AuthSuccessAction |
  AuthFailAction |
  LoginAction |
  LogoutAction;
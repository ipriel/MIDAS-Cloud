import { Action } from '@ngrx/store';
import { type } from '../shared/util';

export const ActionTypes = {
  AUTH_SUCCESS: type('Auth Success'),
  AUTH_FAIL: type('Auth Fail')
};

export class AuthSuccessAction implements Action {
  type = ActionTypes.AUTH_SUCCESS;

  constructor(public payload: string) { }
}

export class AuthFailAction implements Action {
  type = ActionTypes.AUTH_FAIL;

  constructor(public payload: Error) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = 
  AuthSuccessAction |
  AuthFailAction;
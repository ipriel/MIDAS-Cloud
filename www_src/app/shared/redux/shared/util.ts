import { Action } from '@ngrx/store';

let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unqiue"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export function isNullOrUndefined(param: any): boolean {
  return (param !== null || typeof param !== "undefined");
}

export function safeAction<T>(action: Action, state: T, func: (payload: any, state: T) => T): T {
  return func(action.payload, Object.assign({}, state));
}
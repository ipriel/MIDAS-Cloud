import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import * as Auth from './auth.actions';
import { ActionTypes as UserActions } from '../user';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private http$: Http) { }

    @Effect() login$ = this.actions$
        .ofType(Auth.ActionTypes.LOGIN)
        // Map the payload into JSON to use as the request body
        .map((action: Auth.LoginAction) => action.payload)
        .switchMap(payload => this.http$.post('/api/auth/login', payload.response)
            // If successful, dispatch success action with result
            .mergeMap(res => Observable.from([{ type: Auth.ActionTypes.AUTH_SUCCESS, payload: res.json().token }, { type: UserActions.INIT, payload: res.json().user._id }, go(payload.url || "/main")]))
            // If request fails, dispatch failed action
            .catch(err => Observable.of({ type: Auth.ActionTypes.AUTH_FAIL, payload: err }))
        );

    @Effect() logout$ = this.actions$
        .ofType(Auth.ActionTypes.LOGOUT)
        // Map the payload into JSON to use as the request body
        .map((action: Auth.LoginAction) => action.payload)
        .mergeMap(payload => Observable.from([{ type: Auth.ActionTypes.CLEAR_AUTH }, go("/login")]));
}
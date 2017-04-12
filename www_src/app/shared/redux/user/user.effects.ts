import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as User from './user.actions';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private http$: Http) { }

    @Effect() init$ = this.actions$
        .ofType(User.ActionTypes.INIT)
        // Map the payload into JSON to use as the request body
        .map((action: User.InitAction) => action.payload)
        .switchMap(payload => this.http$.get("/api/user/" + payload + "/data"))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.LOAD_DATA, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() confirmPair$ = this.actions$
        .ofType(User.ActionTypes.S_CONFIRM_PAIR)
        // Map the payload into JSON to use as the request body
        .map((action: User.SConfirmPairAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/device/pair", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_CONFIRM_PAIR, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() depair$ = this.actions$
        .ofType(User.ActionTypes.S_DEPAIR_DEVICE)
        // Map the payload into JSON to use as the request body
        .map((action: User.SDepairDeviceAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/device/depair", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_DEPAIR_DEVICE, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() addMirror$ = this.actions$
        .ofType(User.ActionTypes.S_ADD_MIRROR)
        // Map the payload into JSON to use as the request body
        .map((action: User.SAddMirrorAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/mirror/add", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_ADD_MIRROR, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() editMirror$ = this.actions$
        .ofType(User.ActionTypes.S_EDIT_MIRROR)
        // Map the payload into JSON to use as the request body
        .map((action: User.SEditMirrorAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/mirror/edit", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_EDIT_MIRROR, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() remMirror$ = this.actions$
        .ofType(User.ActionTypes.S_REM_MIRROR)
        // Map the payload into JSON to use as the request body
        .map((action: User.SRemoveMirrorAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/mirror/delete", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_REM_MIRROR, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() linkService$ = this.actions$
        .ofType(User.ActionTypes.S_LINK_SVC)
        // Map the payload into JSON to use as the request body
        .map((action: User.SLinkServiceAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/service/link", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_LINK_SVC, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() unlinkService$ = this.actions$
        .ofType(User.ActionTypes.S_UNLINK_SVC)
        // Map the payload into JSON to use as the request body
        .map((action: User.SUnlinkServiceAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/service/unlink", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_UNLINK_SVC, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() addService$ = this.actions$
        .ofType(User.ActionTypes.S_ADD_SVC)
        // Map the payload into JSON to use as the request body
        .map((action: User.SAddServiceAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/service/add", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_ADD_SVC, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() editService$ = this.actions$
        .ofType(User.ActionTypes.S_EDIT_SVC)
        // Map the payload into JSON to use as the request body
        .map((action: User.SEditServiceAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/service/edit", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_EDIT_SVC, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() remService$ = this.actions$
        .ofType(User.ActionTypes.S_REM_SVC)
        // Map the payload into JSON to use as the request body
        .map((action: User.SRemoveServiceAction) => action.payload)
        .switchMap(payload => this.http$.post("/api/user/service/delete", payload))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.L_REM_SVC, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });

    @Effect() getTemplate$ = this.actions$
        .ofType(User.ActionTypes.SVC_GET_TEMPLATE)
        // Map the payload into JSON to use as the request body
        .map((action: User.InitAction) => action.payload)
        .switchMap(payload => this.http$.get("/api/info/" + payload + "/template"))
        // If successful, dispatch success action with result
        .map(res => ({ type: User.ActionTypes.LOAD_DATA, payload: res.json() }))
        // If request fails, log error
        .catch(err => { console.error(err); return Observable.empty() });
}
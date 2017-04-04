import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../shared/redux';
import { ActionTypes as AuthActions } from '../shared/redux/auth';
import { FacebookService, GoogleService } from '../shared/services';

@Component({
    selector: 'mwc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    error: Observable<string>;
    isNewUser: Observable<boolean>;

    constructor(private store$: Store<State>, private fb: FacebookService, private goog: GoogleService) {
        this.error = store$.select(state => { return (state.auth.err !== null) ? state.auth.err.message : "" });
        this.isNewUser = store$.select(state => state.auth.newUser);
    }

    toggleAction() {
        this.store$.dispatch({ type: AuthActions.TOGGLE_ACTION });
    }

    flogin() {
        this.fb.login((response: LoginResponse) => this.store$.dispatch({ type: AuthActions.LOGIN, payload: response.authResponse }));
    }

    glogin() {
        this.goog.signin().then((response: any) => this.store$.dispatch({ type: AuthActions.LOGIN, payload: response }));
    }
}
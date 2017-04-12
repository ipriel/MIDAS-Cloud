import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import { State } from '../shared/redux'
import { ActionTypes as AuthActions } from '../shared/redux/auth'

@Component({
    selector: 'mwc-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {
    authenticated : Observable<boolean>;

    constructor(private store$: Store<State>) {
        this.authenticated = store$.select(state => state.auth.authenticated);
    }

    logout() {
        this.store$.dispatch({type: AuthActions.LOGOUT});
    }
}
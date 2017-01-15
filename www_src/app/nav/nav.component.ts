import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../shared/redux'
import { ActionTypes as AuthActions } from '../shared/redux/auth'

@Component({
    selector: 'el-nav',
    templateUrl: './nav.component.html'
})
export class NavComponent {
    store: Store<State>;
    authenticated : Observable<boolean>;

    constructor(private store$: Store<State>) {
        this.store = store$;
        this.authenticated = store$.select(state => state.auth.authenticated);
    }

    login() {
        console.log("TEST: login triggered");
        this.store.dispatch({type: AuthActions.LOGIN});
    }
}
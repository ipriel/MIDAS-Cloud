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
    dispatch : (Action)=>void;
    authenticated : Observable<boolean>;

    constructor(private store$: Store<State>) {
        this.dispatch = store$.dispatch;
        this.authenticated = store$.select(state => state.auth.authenticated);
    }

    login() {
        this.dispatch({type: AuthActions.LOGIN});
        console.log("TEST: login triggered");
    }
}
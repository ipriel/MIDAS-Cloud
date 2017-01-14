import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State, AuthStore } from '../shared/redux'

@Component({
    selector: 'el-nav',
    templateUrl: './nav.component.html'
})
export class NavComponent {
    authenticated : Observable<boolean>;

    constructor(private store$: Store<State>) {
        this.authenticated = store$.let(AuthStore.getStatus);
    }

    login() {
        console.log("TEST: login triggered");
    }
}
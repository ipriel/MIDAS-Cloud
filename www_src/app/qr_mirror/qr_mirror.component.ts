import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { State } from '../shared/redux';
import { ActionTypes as UserActions } from '../shared/redux/user';

@Component({
    templateUrl: './qr_mirror.component.html'
})
export class QRMirrorComponent {
    mirror: Observable<Mirror>;
    newMirror: Mirror;
    exists: Observable<Boolean>;
    sub: Subscription;

    constructor(private store$: Store<State>, private route: ActivatedRoute) {
        this.exists = this.store$.select(state => typeof state.user.mirrors.find(mirror => mirror.sn === this.newMirror.sn) !== "undefined");
    }

    goBack() {
        this.store$.dispatch(go("main"));
    }

    saveMirror() {
        
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.newMirror.sn = params['sn'];
            this.mirror = this.store$.select(state => state.user.mirrors.find(mirror => mirror.sn === this.newMirror.sn));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
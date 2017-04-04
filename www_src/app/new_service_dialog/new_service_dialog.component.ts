import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { State } from '../shared/redux';
import { ActionTypes as UserActions } from '../shared/redux/user';

@Component({
    templateUrl: './new_service_dialog.component.html'
})
export class NewServiceDialogComponent {
    service: Service;
    action: String;
    serviceTypes: Observable<Array<String>>;
    settings: Array<Setting>;
    sub: Subscription;

    constructor(public dialogRef: MdDialogRef<NewServiceDialogComponent>, public store$: Store<State> ) {
        this.service = {};
        this.serviceTypes = this.store$.select(state => state.user.serviceTypes);
    }

    typeChanged() {
        this.store$.dispatch({type: UserActions.SVC_GET_TEMPLATE, payload: this.service.type});
    }

    ngOnInit() {
        this.sub = this.store$.select(state => state.user.serviceTemplate).subscribe(settings => {
            this.settings = settings;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    close(service) {
        service.settings = this.settings;
        this.dialogRef.close(service);
    }
}
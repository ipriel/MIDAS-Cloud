import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../shared/redux';
import { ActionTypes as UserActions } from '../shared/redux/user';

@Component({
    templateUrl: './edit_service_dialog.component.html'
})
export class EditServiceDialogComponent {
    service: Service;

    constructor(public dialogRef: MdDialogRef<EditServiceDialogComponent>, public store$: Store<State> ) {}
}
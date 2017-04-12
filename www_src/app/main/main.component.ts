import { Component } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import { State } from '../shared/redux';
import { ActionTypes as UserActions } from '../shared/redux/user';

import { MirrorDialogComponent } from '../mirror_dialog/mirror_dialog.component';
import { ConfirmDialogComponent } from '../confirm_dialog/confirm_dialog.component';
import { NewServiceDialogComponent } from '../new_service_dialog/new_service_dialog.component';
import { EditServiceDialogComponent } from '../edit_service_dialog/edit_service_dialog.component';

@Component({
    templateUrl: './main.component.html'
})
export class MainComponent {
    mirrorDialogRef: MdDialogRef<MirrorDialogComponent>;
    confirmDialogRef: MdDialogRef<ConfirmDialogComponent>;
    newServiceDialogRef: MdDialogRef<NewServiceDialogComponent>;
    editServiceDialogRef: MdDialogRef<EditServiceDialogComponent>;
    mirrors: Observable<Array<Mirror>>;
    devices: Observable<Array<Device>>;
    services: Observable<Array<Service>>;

    constructor(private store$: Store<State>, public dialog: MdDialog) {
        this.mirrors = store$.select(state => state.user.mirrors);
        this.devices = store$.select(state => state.user.devices);
        this.services = store$.select(state => state.user.services);
        //Dev
        store$.dispatch({type: UserActions.S_ADD_MIRROR, payload: { name: "Bathroom", _id: "0032A" }});
        store$.dispatch({type: UserActions.S_ADD_MIRROR, payload: { name: "Hall", _id: "0468A" }});
        store$.dispatch({type: UserActions.ADD_DEVICE, payload: { _id: 8, name: "Itamar's Phone", paired: false }});
        store$.dispatch({type: UserActions.ADD_DEVICE, payload: { _id: 9, name: "Itamar's Tablet", paired: false }});
    }

    pairDevice(device: Device) {
        this.store$.dispatch({type: UserActions.S_CONFIRM_PAIR, payload: device._id});
    }

    depairDevice(device: Device) {
        this.store$.dispatch({type: UserActions.S_DEPAIR_DEVICE, payload: device._id});
    }

    addMirror() {
        this.mirrorDialogRef = this.dialog.open(MirrorDialogComponent, {
            disableClose: false
        });

        this.mirrorDialogRef.afterClosed().subscribe(result => {
            if (typeof result !== "undefined") {
                this.store$.dispatch({type: UserActions.S_ADD_MIRROR, payload: result});
            }
            this.mirrorDialogRef = null;
        });
    }

    editMirror(mirror: Mirror) {
        this.store$.dispatch(go("/details/" + mirror._id));
    }

    removeMirror(mirror: Mirror) {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.name = mirror.name;

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store$.dispatch({type: UserActions.S_REM_MIRROR, payload: mirror._id});
            }
            this.confirmDialogRef = null;
        });
    }

    addService() {
        this.newServiceDialogRef = this.dialog.open(NewServiceDialogComponent, {
            disableClose: false
        });

        this.newServiceDialogRef.afterClosed().subscribe(result => {
            if (typeof result !== "undefined") {
                this.store$.dispatch({type: UserActions.S_ADD_SVC, payload: result});
            }
            this.newServiceDialogRef = null;
        });
    }

    editService(service: Service) {
        this.editServiceDialogRef = this.dialog.open(EditServiceDialogComponent, {
            disableClose: false
        });
        this.editServiceDialogRef.componentInstance.service = service;

        this.editServiceDialogRef.afterClosed().subscribe(result => {
            if (typeof result !== "undefined") {
                this.store$.dispatch({type: UserActions.S_EDIT_SVC, payload: result});
            }
            this.editServiceDialogRef = null;
        });
    }

    removeService(service: Service) {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.name = service.name;

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store$.dispatch({type: UserActions.S_REM_SVC, payload: service._id});
            }
            this.confirmDialogRef = null;
        });
    }
}
import { Component } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../shared/redux'
import { ActionTypes as AuthActions } from '../shared/redux/auth'

import { MirrorDialogComponent } from '../mirror_dialog/mirror_dialog.component'
import { ConfirmDialogComponent } from '../confirm_dialog/confirm_dialog.component'

@Component({
    templateUrl: './main.component.html'
})
export class MainComponent {
    mirrorDialogRef: MdDialogRef<MirrorDialogComponent>;
    confirmDialogRef: MdDialogRef<ConfirmDialogComponent>;
    store: Store<State>;
    mirrors: Array<any>;
    devices: Array<any>;

    constructor(private store$: Store<State>, public dialog: MdDialog) {
        this.store = store$;
        this.mirrors = [{ name: "Bathroom", serial: "0032A" }, { name: "Hall", serial: "0468A" }];
        this.devices = [{ name: "Itamar's Phone", mirror: "Bathroom", mac: "987" }, { name: "Itamar's Tablet", mirror: "Bathroom", mac: "325" }];
    }

    pairDevice(device: any) {
        alert("Confirmed:\nName: " + device.name + "\nMirror: " + device.mirror + "\nMac: " + device.mac);
    }

    addMirror() {
        this.mirrorDialogRef = this.dialog.open(MirrorDialogComponent, {
            disableClose: false
        });

        this.mirrorDialogRef.afterClosed().subscribe(result => {
            if (typeof result !== "undefined") {
                this.mirrors.push(result);
            }
        });
    }

    removeMirror(mirror: any) {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.name = mirror.name;

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                var index = this.mirrors.indexOf(mirror);
                this.mirrors.splice(index, 1);
            }
            this.confirmDialogRef = null;
        });
    }
}
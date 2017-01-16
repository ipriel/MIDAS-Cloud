import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../shared/redux'
import { ActionTypes as AuthActions } from '../shared/redux/auth'

import { MirrorDialogComponent } from '../mirror_dialog/mirror_dialog.component'
import { ConfirmDialogComponent } from '../confirm_dialog/confirm_dialog.component'

@Component({
    templateUrl: './details.component.html'
})
export class DetailsComponent {
    mirrorDialogRef: MdDialogRef<MirrorDialogComponent>;
    confirmDialogRef: MdDialogRef<ConfirmDialogComponent>;
    mirror: any;
    sub: any;
    id: any;

    constructor(public store$: Store<State>, public dialog: MdDialog, private route: ActivatedRoute) { }

    removeService(service: any) {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.name = service.name;

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                //dispatch("REM_SVC" {id: service.id})
            }
            this.confirmDialogRef = null;
        });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            //store.select(mirrors[this.id]).subscribe(mirror => this.mirror = mirror)
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
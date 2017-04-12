import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { State } from '../shared/redux';
import { ActionTypes as UserActions } from '../shared/redux/user';

import { ConfirmDialogComponent } from '../confirm_dialog/confirm_dialog.component';
import { NewServiceDialogComponent } from '../new_service_dialog/new_service_dialog.component';

@Component({
    templateUrl: './details.component.html'
})
export class DetailsComponent {
    confirmDialogRef: MdDialogRef<ConfirmDialogComponent>;
    newServiceDialogRef: MdDialogRef<NewServiceDialogComponent>;
    mirror: Observable<Mirror>;
    newMirror: Mirror;
    services: Observable<Array<Service>>;
    selectedService: Service;
    editMirror: Boolean;
    sub: Subscription;
    id: ObjectId;

    constructor(private store$: Store<State>, public dialog: MdDialog, private route: ActivatedRoute) {
        this.services = store$.select(state => state.user.services);
    }

    nameChange(newValue: String) {
        this.newMirror.name = newValue;
    }

    snChange(newValue: String) {
        this.newMirror.sn = newValue;
    }

    saveMirror() {
        this.newMirror._id = this.id;
        this.store$.dispatch({type: UserActions.EDIT_MIRROR, payload: this.newMirror});
        this.editMirror = !this.editMirror;
        this.newMirror = {};
    }

    linkService() {
        this.store$.dispatch({type: UserActions.LINK_SVC, payload: {parentId: this.id, child: this.selectedService}});
    }

    unlinkService(service: Service) {
        this.store$.dispatch({type: UserActions.UNLINK_SVC, payload: {parentId: this.id, child: service}});
    }

    goBack() {
        this.store$.dispatch(go("/main"));
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.mirror = this.store$.select(state => state.user.mirrors.find(mirror => mirror._id === this.id));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
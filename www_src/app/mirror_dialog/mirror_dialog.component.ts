import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './mirror_dialog.component.html'
})
export class MirrorDialogComponent {
    mirror: any;

    constructor(public dialogRef: MdDialogRef<MirrorDialogComponent>) {
        this.mirror = {};
    }
}
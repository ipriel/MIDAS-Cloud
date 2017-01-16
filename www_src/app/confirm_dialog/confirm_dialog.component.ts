import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './confirm_dialog.component.html'
})
export class ConfirmDialogComponent {
    name: String;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {}
}
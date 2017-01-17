import { Component } from '@angular/core';

@Component({
    selector: 'mwc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private badUser : boolean;

    constructor() { 
        // temp - should sync to ngrx/store
        this.badUser = false;
    }
}
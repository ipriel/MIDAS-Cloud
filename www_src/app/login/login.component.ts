import { Component } from '@angular/core';

@Component({
    selector: 'el-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private badUser : boolean;

    constructor() { 
        // temp - should sync to ngrx/store
        this.badUser = false;
    }
}
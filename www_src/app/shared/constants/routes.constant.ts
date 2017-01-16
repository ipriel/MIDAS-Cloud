import { Routes } from '@angular/router';

import { LoginComponent } from '../../login/login.component';
import { MainComponent } from '../../main/main.component';
import { DetailsComponent } from '../../details/details.component';

export const routes: Routes = [
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'details/:id',
        component: DetailsComponent
    },
    {
        path: 'Main',
        component: MainComponent
    },
    {
        path: '',
        redirectTo: '/Login',
        pathMatch: 'full'
    }
];
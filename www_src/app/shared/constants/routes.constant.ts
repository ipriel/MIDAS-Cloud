import { Routes } from '@angular/router';

import { LoginComponent } from '../../login/login.component';
import { MainComponent } from '../../main/main.component';
import { DetailsComponent } from '../../details/details.component';
import { QRMirrorComponent } from '../../qr_mirror/qr_mirror.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'details/:id',
        component: DetailsComponent
    },
    {
        path: 'mirror/:sn',
        component: QRMirrorComponent
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
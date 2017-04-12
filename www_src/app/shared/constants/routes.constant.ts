import { Routes } from '@angular/router';

import { LoginComponent } from '../../login/login.component';
import { MainComponent } from '../../main/main.component';
import { DetailsComponent } from '../../details/details.component';
import { QRMirrorComponent } from '../../qr_mirror/qr_mirror.component';
import { AuthGuard } from '../guards';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'details/:id',
        canActivate: [ AuthGuard ],
        component: DetailsComponent
    },
    {
        path: 'mirror/:sn',
        canActivate: [ AuthGuard ],
        component: QRMirrorComponent
    },
    {
        path: 'main',
        canActivate: [ AuthGuard ],
        component: MainComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
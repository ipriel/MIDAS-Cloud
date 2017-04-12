import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../redux';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store$: Store<State>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Boolean> {
        return this.store$.select(state => state.auth.authenticated)
            .map(authenticated => {
                if(!authenticated)
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

                return authenticated;
            });
        //return Observable.of(true);
    }
}
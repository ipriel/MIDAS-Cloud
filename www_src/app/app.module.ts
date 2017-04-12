import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';

import {
  AuthEffects, UserEffects, reducer, routes, resolvePipe,
  AuthGuard, FacebookService, INIT_PARAMS, fbParams,
  GoogleService, GOOG_ID, googId
} from './shared';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';
import { QRMirrorComponent } from './qr_mirror/qr_mirror.component';
import { MirrorDialogComponent } from './mirror_dialog/mirror_dialog.component';
import { ConfirmDialogComponent } from './confirm_dialog/confirm_dialog.component';
import { NewServiceDialogComponent } from './new_service_dialog/new_service_dialog.component';
import { EditServiceDialogComponent } from './edit_service_dialog/edit_service_dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(UserEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    MainComponent,
    DetailsComponent,
    QRMirrorComponent,
    MirrorDialogComponent,
    ConfirmDialogComponent,
    NewServiceDialogComponent,
    EditServiceDialogComponent,
    resolvePipe
  ],
  providers: [
    AuthGuard,
    FacebookService,
    { provide: INIT_PARAMS, useValue: fbParams },
    GoogleService,
    { provide: GOOG_ID, useValue: googId }
  ],
  entryComponents: [
    MirrorDialogComponent,
    ConfirmDialogComponent,
    NewServiceDialogComponent,
    EditServiceDialogComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
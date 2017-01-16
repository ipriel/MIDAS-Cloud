import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';

import { routes, reducer } from './shared'
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MirrorDialogComponent } from './mirror_dialog/mirror_dialog.component';
import { ConfirmDialogComponent } from './confirm_dialog/confirm_dialog.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    MainComponent,
    MirrorDialogComponent,
    ConfirmDialogComponent,
    DetailsComponent
  ],
  entryComponents: [
    MirrorDialogComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
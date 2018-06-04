/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbAuthModule, NbEmailPassAuthProvider, NbAuthJWTToken, NB_AUTH_TOKEN_CLASS } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { ContentService } from './services/content.services';
import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
        providers: {
          email: {
            service: NbEmailPassAuthProvider,
            config: {
              baseEndpoint: environment.api,
              login: {
                endpoint: '/api/Auth',
                method: 'post',
                defaultErrors: ['Login/Email combination is not correct, please try again.'],
                defaultMessages: ['You have been successfully logged in.'],
                redirect: {
                  success: '/',
                  failure: null,
                },
              },
              logout: {
                // alwaysFail: false,
                // endpoint: '/api/auth/logout',
                // method: 'delete',
                redirect: {
                  success: '/',
                  failure: '/',
                },
                // defaultErrors: ['Something went wrong, please try again.'],
                // defaultMessages: ['You have been successfully logged out.'],
              },
              token: {
                key: 'token', // this parameter tells Nebular where to look for the token
              },
            },
          },
        },
        forms: {
          logout: {
            redirectDelay: 0,
          },
        },
      }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    AuthGuard,
    ContentService,
  ],
})
export class AppModule {
}

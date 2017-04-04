/// <reference path="./facebook.service.d.ts" />
declare var FB: FB;

import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';

export let INIT_PARAMS = new OpaqueToken('FB.InitParams');

@Injectable()
export class FacebookService {
    constructor( @Optional() @Inject(INIT_PARAMS) params: InitParams) {
        if (params !== null && typeof params !== "undefined") {
            this.init(params);
        }
    }

    init(params: InitParams) {
        FB.init(params);
    }

    api(path: string, method: string = 'get', params = {}, callback: callback = () => {}) {
        FB.api(path, method, params, callback);
    }

    ui(params: any, callback: callback) {
        FB.ui(params, callback);
    }

    getLoginStatus(callback: callback) {
        FB.getLoginStatus(callback);
    }

    login(callback: callback) {
        FB.login(() => { });
    }

    logout(callback: callback) {
        FB.logout(() => { });
    }

    deauthorize(callback: callback) {
        this.api('/me/permissions', 'delete', callback);
    }

    getAuthResponse() {
        return FB.getAuthResponse();
    };
}
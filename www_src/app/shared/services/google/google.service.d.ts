
declare type LoginSuccessCallback = (googleUser: GoogleUser) => void;

declare type FailureCallback = (err?: Error) => void;

declare type watcher<T> = {
    get: () => T;
    listen: (listener: (newState: T) => void) => void;
}

declare type SignInOptions = {
    app_package_name?: string;
    fetch_basic_profile?: boolean;
    prompt?: string;
    scope?: string;
};

declare type SignInButtonParams = {
    scope?: string;
    width?: number;
    height?: number;
    longtitle?: boolean;
    theme?: string;
    onsuccess?: LoginSuccessCallback;
    onfailure?: FailureCallback;
    app_package_name?: string;
};

declare interface GoogleUser {
    getId: () => string;
    isSignedIn: () => boolean;
    getHostedDomain: () => string;
    getGrantedScopes: () => string;
    getBasicProfile: () => gapi.auth2.BasicProfile;
    getAuthResponse: () => gapi.auth2.AuthResponse;
    hasGrantedScopes: (scopes: string) => boolean;
    signin: (options: SignInOptions) => Promise<any>;
    grant: (options: SignInOptions) => Promise<any>;
    grantOfflineAccess: (scopes: string) => void;
    disconnect: () => void;
}

declare interface gapi {
    load: (resource: string, callback: () => void) => void;
    auth2: gapi.auth2;
    signin2: gapi.signin2;
}

declare namespace gapi {
    interface auth2 {
        init: (params: auth2.initParams) => auth2.GoogleAuth;
        getAuthInstance: () => auth2.GoogleAuth;
        attachClickHandler: (container: string | HTMLElement, options: SignInOptions, onSuccess: LoginSuccessCallback, onFailure: FailureCallback) => void;
    }

    interface signin2 {
        render: (id: string, options: SignInButtonParams) => void;
    }

    namespace auth2 {
        type initParams = {
            client_id: string;
            cookie_policy?: string;
            scope?: string;
            fetch_basic_profile?: boolean;
            hosted_domain?: string;
            openid_realm?: string;
        }

        interface GoogleAuth {
            then: (onInit: () => void) => Promise<any>;
            isSignedIn: watcher<boolean>;
            signin: (options?: SignInOptions) => Promise<any>;
            signout: () => Promise<any>;
            disconnect: () => void;
            grantOfflineAccess: (options: { scope: string; redirect_uri: string; }) => Promise<any | { code: string }>
            attachClickHandler: (container: string | HTMLElement, options: SignInOptions, onSuccess: LoginSuccessCallback, onFailure: FailureCallback) => void;
            currentUser: watcher<GoogleUser>;
        }

        interface BasicProfile {
            getId: () => string;
            getName: () => string;
            getGivenName: () => string;
            getFamilyName: () => string;
            getImagUrl: () => string;
            getEmail: () => string;
        }

        interface AuthResponse {
            access_token: string;
            id_token: string;
            login_hint: string;
            scope: string;
            expires_in: string;
            first_issued_at: string;
            expires_at: string;
        }
    }
}
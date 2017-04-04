declare type callback = (response: any) => void;
declare type loginCallback = (response: LoginResponse) => void;

declare interface FB {
    init: (params: InitParams) => void;
    api: (path: string, method: string, params: any, callback: callback) => void;
    ui: (params: any, callback: callback) => void;
    getLoginStatus: (callback: loginCallback) => void;
    login: (callback: loginCallback, options?: LoginOptions) => void;
    logout: (callback: callback) => void;
    getAuthResponse: () => AuthResponse;
}

declare type InitParams = {
    appId: string,
    status: boolean,
    xfbml: boolean,
    version: string,
    cookie?: boolean,
    frictionlessRequests?: boolean,
    hideFlashCallback?: (params: { state?: string }) => void
};

declare type LoginOptions = {
    auth_type: string,
    scope: string,
    return_scopes: boolean,
    enable_profile_selector: boolean,
    profile_selector_ids: string
};

declare type AuthResponse = {
    accessToken: string,
    expiresIn: any,
    signedRequest: boolean,
    userID: string
};

declare type LoginResponse = {
    status: string,
    authResponse: AuthResponse
};
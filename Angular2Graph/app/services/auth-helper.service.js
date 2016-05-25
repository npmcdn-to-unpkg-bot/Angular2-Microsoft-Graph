"use strict";
var svc_consts_1 = require("../svc-consts");
var AuthHelperService = (function () {
    function AuthHelperService() {
        //function to parse the url query string
        this.parseQueryString = function (url) {
            var params = {}, queryString = url.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            return params;
        };
        this.params = this.parseQueryString(location.hash);
        this.access_token = null;
        //check for id_token or access_token in url
        console.log(this.params);
        if (this.params["id_token"] != null)
            this.getAccessToken();
        else if (this.params["access_token"] != null)
            this.access_token = this.params["access_token"];
    }
    AuthHelperService.prototype.login = function () {
        //redirect to get id_token
        window.location.href = "https://login.microsoftonline.com/" + svc_consts_1.SvcConsts.TENTANT_ID +
            "/oauth2/authorize?response_type=id_token&client_id=" + svc_consts_1.SvcConsts.CLIENT_ID +
            "&redirect_uri=" + encodeURIComponent(window.location.href) +
            "&state=SomeState&nonce=SomeNonce";
    };
    AuthHelperService.prototype.getAccessToken = function () {
        //redirect to get access_token
        window.location.href = "https://login.microsoftonline.com/" + svc_consts_1.SvcConsts.TENTANT_ID +
            "/oauth2/authorize?response_type=token&client_id=" + svc_consts_1.SvcConsts.CLIENT_ID +
            "&resource=" + svc_consts_1.SvcConsts.GRAPH_RESOURCE +
            "&redirect_uri=" + encodeURIComponent(window.location.href) +
            "&prompt=none&state=SomeState&nonce=SomeNonce";
    };
    return AuthHelperService;
}());
exports.AuthHelperService = AuthHelperService;

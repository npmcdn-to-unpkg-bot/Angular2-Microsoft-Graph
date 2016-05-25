"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var graph_service_1 = require('../services/graph.service');
var auth_helper_service_1 = require('../services/auth-helper.service');
var core_1 = require('angular2/core');
var AppComponent = (function () {
    function AppComponent(_graphService, _authHelpService) {
        this._graphService = _graphService;
        this._authHelpService = _authHelpService;
        this.logeado = false;
        this.userData = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("LOGEADO", this._authHelpService.access_token);
        // Si esta logeado
        if (this._authHelpService.access_token) {
            this.cargarDatosDelUsuario();
        }
        // Mantiene la pantalla con el "Cargando..." unos segundos
        setTimeout(function () {
            document.getElementById("appContenido").style.display = "block";
            document.getElementById("cargando").style.display = "none";
        }, 1500);
    };
    AppComponent.prototype.login = function () {
        if (!this._authHelpService.access_token)
            this._authHelpService.login();
        else
            alert("Ya has iniciado sesión");
    };
    AppComponent.prototype.logout = function () {
        window.location.href = "http://localhost:49401/";
    };
    AppComponent.prototype.cargarDatosDelUsuario = function () {
        var _this = this;
        this._graphService.getUserData().subscribe(function (res) {
            _this.userData = res;
            _this.logeado = true;
            console.log(_this.userData);
        }, function (Error) {
            alert("Error al cargar datos del usuario");
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: BASE_URL + '/templates/app.template.html',
            providers: [graph_service_1.GraphService, auth_helper_service_1.AuthHelperService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

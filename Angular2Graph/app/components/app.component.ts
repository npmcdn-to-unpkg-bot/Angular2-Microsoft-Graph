import {GraphService}          from '../services/graph.service'
import {AuthHelperService}     from '../services/auth-helper.service'
import {Component, OnInit}     from 'angular2/core'

@Component({
    selector: 'app',
    templateUrl: BASE_URL + '/templates/app.template.html',
    providers: [GraphService, AuthHelperService]
})

export class AppComponent {
    public logeado: boolean = false;
    public userData: any = null;

    constructor(private _graphService: GraphService, private _authHelpService: AuthHelperService) {
    }

    public ngOnInit() {
        console.log("LOGEADO", this._authHelpService.access_token);

        // Si esta logeado
        if (this._authHelpService.access_token) {
            this.cargarDatosDelUsuario();
        }
        // Mantiene la pantalla con el "Cargando..." unos segundos
        setTimeout(function () {
            document.getElementById("appContenido").style.display = "block";
            document.getElementById("cargando").style.display = "none";
        }, 1500)
    }

    public login() {
        if (!this._authHelpService.access_token)
            this._authHelpService.login();
        else
            alert("Ya has iniciado sesión")
    }

    public logout() {
        window.location.href = "http://localhost:49401/";
    }

    public cargarDatosDelUsuario() {
        this._graphService.getUserData().subscribe(res => {
            this.userData = res;
            this.logeado = true;
            console.log(this.userData);

        }, Error => {
            alert("Error al cargar datos del usuario");
        });
    }
}
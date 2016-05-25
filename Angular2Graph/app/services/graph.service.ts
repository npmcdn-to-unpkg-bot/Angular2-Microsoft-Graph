import {Http, Headers, Response}    from 'angular2/http'
import {AuthHelperService}     from '../services/auth-helper.service'
import { Injectable } from "angular2/core";
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {
    constructor(private _http: Http, private _authHelpService: AuthHelperService) {

    };

    public getUserData() {
        return this._http.get("https://graph.microsoft.com/v1.0/me",
            {headers: new Headers({ "Authorization": "Bearer " + this._authHelpService.access_token })
            }).map((res: Response) => res.json());
    }
}
"use strict";
var app_component_1 = require('./components/app.component');
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
browser_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS]);

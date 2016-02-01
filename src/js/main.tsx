///<reference path="../../typings/tsd.d.ts"/>
"use strict";

declare var global: any;

var $ = require("jquery");
global.$ = $;
global.jQuery = global.$;
global.Foundation = require("foundation-sites");

import * as React from "react";
import * as ReactDOM from "react-dom";
import router from "./router";

$(document).foundation();

ReactDOM.render(router, document.getElementById("react-container"));


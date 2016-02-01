///<reference path="../../typings/tsd.d.ts"/>

"use strict";
import * as React from "react";
import {Router, Route} from "react-router";

import HomeView from "./views/home/HomeView";

let router = (
  <Router>
    <Route path="/" component={HomeView}/>
  </Router>
);

export default router;
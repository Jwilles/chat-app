import {Router, RouterConfig, Routes} from "@angular/router";

import {LoginComponent} from "./login.component";

import * as myGlobal from "../services/global";

export const LoginRoutes: Routes = [
    { path: 'login', component: LoginComponent }
];

import {Router, RouterConfig, Routes} from "@angular/router";

import {RegistrationComponent} from "./registration.component";

import * as myGlobal from "../services/global";

export const RegistrationRoutes: Routes = [
    { path: '', component: RegistrationComponent }
];

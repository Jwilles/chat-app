import {Router, Routes} from "@angular/router";

import {LobbyComponent} from "./lobby.component";

import * as myGlobal from "../services/global";


export const LobbyComponentRoutes: Routes = [
    { path: 'lobby', component: LobbyComponent }
];

import { Routes, RouterModule, provideRouter } from "@angular/router";

import { LoginRoutes }  from "./login-component/index";
import { RegistrationRoutes } from "./registration-component/index";
import { LobbyComponentRoutes } from "./lobby-component/index";
import {ModuleWithProviders} from "@angular/core";

export const appRoutes: Routes = [
    ...RegistrationRoutes,		 
    ...LobbyComponentRoutes,
    ...LoginRoutes
];

export const appRoutingProviders: any[] = [ provideRouter(appRoutes) ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

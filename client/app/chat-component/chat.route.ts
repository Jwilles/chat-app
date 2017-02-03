import {Router, Routes} from "@angular/router";

import {ChatComponent} from "./chat.component";

import * as myGlobal from "../services/global";


export const ChatComponentRoutes: Routes = [
    { path: 'chat', component: ChatComponent }
];

import { NgModule }      from "@angular/core";
import {RouterModule}	from "@angular/router";
import { CommonModule } from "@angular/common";
import { RegistrationComponent }  from "./registration.component";
import { UserService } from "../services/user.service";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports:      [ CommonModule, RouterModule, FormsModule],
    declarations: [ RegistrationComponent ],
    providers:    [ UserService ],
    exports: 	  [ RegistrationComponent ]
})

export class RegistrationModule {}

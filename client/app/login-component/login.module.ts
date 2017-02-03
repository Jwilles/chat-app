import { NgModule }      from "@angular/core";
import {RouterModule}	from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoginComponent }  from "./login.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports:      [ CommonModule, RouterModule, FormsModule],
    declarations: [ LoginComponent ],
    exports: 	  [ LoginComponent ]
})

export class LoginModule {}

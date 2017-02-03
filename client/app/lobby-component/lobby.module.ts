import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LobbyComponent } from "./lobby.component";
import {RouterModule}	from "@angular/router";
import { FormsModule } from "@angular/forms";



@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [LobbyComponent],
    exports: [LobbyComponent]
})

export class LobbyModule {}

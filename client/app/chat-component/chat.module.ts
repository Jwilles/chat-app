import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "./chat.component";
import {RouterModule}	from "@angular/router";
import { FormsModule } from "@angular/forms";




@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [ChatComponent],
    exports: [ChatComponent]
})

export class ChatModule {}

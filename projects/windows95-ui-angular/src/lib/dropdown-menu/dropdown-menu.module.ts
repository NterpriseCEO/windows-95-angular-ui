import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { DropdownMenu } from "./dropdown-menu.component";
import { ButtonModule } from "../button/button.module";
import { ScrollDirective, ScrollService } from "./scroll.directive"; 

@NgModule({
	declarations: [
		DropdownMenu,
		ScrollDirective
	],
	imports: [
		BrowserModule,
		RouterModule,
		ButtonModule
	],
	exports: [
		DropdownMenu,
		ScrollDirective
	]
})
export class DropdownMenuModule { }

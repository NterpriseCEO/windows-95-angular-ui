import { NgModule } from "@angular/core";
import { PaginatorComponent } from "./paginator.component";
import { ButtonModule } from "../button/button.module";
import { PanelModule } from "../panel/panel.module";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
	declarations: [
		PaginatorComponent
	],
	imports: [
		BrowserModule,
		ButtonModule,
		PanelModule
	],
	exports: [
		PaginatorComponent
	]
})
export class PaginatorModule { }

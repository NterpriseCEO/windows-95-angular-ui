import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WindowComponent } from "./window.component";
import { ButtonModule } from "../button/button.module";

@NgModule({
	declarations: [
		WindowComponent
	],
	imports: [
		CommonModule,
		ButtonModule
	],
	exports: [
		WindowComponent
	]
})
export class WindowComponentModule { }

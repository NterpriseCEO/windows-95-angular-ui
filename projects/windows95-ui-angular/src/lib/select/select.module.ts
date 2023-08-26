import { NgModule } from "@angular/core";
import { Select } from "./select.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
	declarations: [
		Select
	],
	imports: [
		FormsModule,
		BrowserModule
	],
	exports: [
		Select
	]
})
export class SelectModule { }

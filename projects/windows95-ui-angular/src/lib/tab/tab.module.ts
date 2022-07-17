import { NgModule } from "@angular/core";
import { Tab } from "./tab.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
	declarations: [
		Tab
	],
	imports: [
		BrowserModule
	],
	exports: [
		Tab
	]
})
export class TabModule { }

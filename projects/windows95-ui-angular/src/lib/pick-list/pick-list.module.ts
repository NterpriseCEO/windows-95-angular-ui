import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { PickListComponent } from "./pick-list.component";

@NgModule({
	declarations: [
		PickListComponent
	],
	imports: [
		FormsModule,
		BrowserModule
	],
	exports: [
		PickListComponent
	]
})
export class PickListModule { }

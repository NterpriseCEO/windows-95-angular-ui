import { NgModule } from "@angular/core";
import { TextInput } from "./text-input.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
	declarations: [
		TextInput
	],
	imports: [
		FormsModule,
		BrowserModule
	],
	exports: [
		TextInput
	]
})
export class TextInputModule { }

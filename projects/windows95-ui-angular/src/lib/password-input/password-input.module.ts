import { NgModule } from "@angular/core";
import { PasswordInput } from "./password-input.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
	declarations: [
		PasswordInput
	],
	imports: [
		FormsModule,
		BrowserModule
	],
	exports: [
		PasswordInput
	]
})
export class PasswordInputModule { }

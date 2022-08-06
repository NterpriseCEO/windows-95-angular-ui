import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FileInput } from "./file-input.component";

@NgModule({
	declarations: [
		FileInput
	],
	imports: [
		BrowserModule
	],
	exports: [
		FileInput
	]
})
export class FileInputModule { }

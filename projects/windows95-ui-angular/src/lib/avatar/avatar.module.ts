import { NgModule } from "@angular/core";
import { Avatar } from "./avatar.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
	declarations: [
		Avatar
	],
	imports: [
		BrowserModule
	],
	exports: [
		Avatar
	]
})
export class AvatarModule { }

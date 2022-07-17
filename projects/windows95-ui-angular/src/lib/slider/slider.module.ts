import { NgModule } from "@angular/core";
import { Slider } from "./slider.component";
import { CommonModule } from "@angular/common";

// import { BrowserModule } from "@angular/platform-browser";

@NgModule({
	declarations: [
		Slider
	],
	imports: [
		// BrowserModule
		CommonModule
	],
	exports: [
		Slider
	]
})
export class SliderModule { }

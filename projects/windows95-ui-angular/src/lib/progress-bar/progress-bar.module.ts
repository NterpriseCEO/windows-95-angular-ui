import { NgModule } from '@angular/core';
import { ProgressBar } from './progress-bar.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
	declarations: [
		ProgressBar
	],
	imports: [
		BrowserModule
	],
	exports: [
		ProgressBar
	]
})
export class ProgressBarModule { }

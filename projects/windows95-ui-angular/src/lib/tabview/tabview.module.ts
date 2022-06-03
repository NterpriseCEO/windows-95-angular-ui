import { NgModule } from '@angular/core';
import { TabView } from './tabview.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
	declarations: [
		TabView
	],
	imports: [
		BrowserModule
	],
	exports: [
		TabView
	]
})
export class TabViewModule { }

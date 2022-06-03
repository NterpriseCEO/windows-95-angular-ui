import { Component, Input } from '@angular/core';

@Component({
	selector: "tab",
	templateUrl: "./tab.component.html"
})
export class Tab {	

	@Input() title: string = "Tab"

	active: boolean = false;

	constructor() { }
}

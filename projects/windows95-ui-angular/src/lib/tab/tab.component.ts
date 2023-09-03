import { Component, Input, TemplateRef } from "@angular/core";

@Component({
	selector: "tab",
	templateUrl: "./tab.component.html"
})
export class Tab {	

	@Input() tabTitle: string = "Tab";

	active: boolean = false;

	constructor() { }
}

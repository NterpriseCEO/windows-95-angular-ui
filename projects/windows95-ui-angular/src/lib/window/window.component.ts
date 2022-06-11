import { Component, Input } from '@angular/core';

@Component({
	selector: "window",
	templateUrl: "window.component.html",	
	styleUrls: ["window.component.scss"]
})
export class WindowComponent {

	@Input() styleClass: string = "";
	@Input() title: string = "";
	@Input() active: boolean = false;

	constructor() { }
}

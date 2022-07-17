import { Component, Input } from "@angular/core";

@Component({
	selector: "window",
	templateUrl: "window.component.html",	
	styleUrls: ["window.component.scss"]
})
export class WindowComponent {

	@Input() styleClass: string = "";
	@Input() title: string = "";
	@Input() active: boolean = true;
	@Input() showCloseButton: boolean = true;
	@Input() headerButtons: any[] = [];

	constructor() {}
}

export interface WindowHeaderButton {
	text: string;
	action: () => void;
}
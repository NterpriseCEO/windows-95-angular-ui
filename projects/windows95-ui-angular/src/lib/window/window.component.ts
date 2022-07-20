import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "window",
	templateUrl: "window.component.html",	
	styleUrls: ["window.component.scss"]
})
export class WindowComponent {

	@Input() styleClass: string = "";
	@Input() inlineStyles: any = "";
	@Input() title: string = "";
	@Input() active: boolean = true;
	@Input() showCloseButton: boolean = true;
	@Input() headerButtons: any[] = [];

	@Output() onClose = new EventEmitter<any>();

	constructor() {}

	styles(): object {
		try {
			return JSON.parse(this.inlineStyles);
		}catch (e) {
			return {};
		}
	}
}

export interface WindowHeaderButton {
	text: string;
	action: () => void;
}
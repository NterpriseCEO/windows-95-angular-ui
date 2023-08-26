import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "windows-button",
	template: `<button (click) = "click()" [disabled] = "disabled" [class] = "styleClass"><ng-content></ng-content></button>`,
	styleUrls: ["./button.component.scss"]
})
export class WindowsButton {
	constructor() { }

	@Input() disabled: boolean = false;
	@Input() styleClass: string = "";

	@Output() onClick: EventEmitter<any> = new EventEmitter();

	click() {
		this.onClick.emit();
	}

}

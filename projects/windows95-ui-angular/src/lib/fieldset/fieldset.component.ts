import { Component, Input } from "@angular/core";

@Component({
	selector: "windows-fieldset",
	template:	`<fieldset [class] = "styleClass" [disabled] = "disabled">
					<legend>{{legend}}</legend>
					<ng-content></ng-content>
				</fieldset>`,
	styleUrls: ["./fieldset.component.scss"]
})
export class Fieldset {

	@Input() styleClass: string = "";
	@Input() legend: string = "";
	@Input() disabled: boolean = false;

	constructor() { }
}

import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "text-input",
	templateUrl: "./text-input.component.html",
	styleUrls: ["./text-input.component.scss"]
})
export class TextInput {

	@Input() disabled: boolean = false;
	@Input() placeholder: string = "";
	@Input() value: string = "";
	@Input() isTextarea: boolean = false;
	@Input() rows: number = 2;
	@Input() cols: number = 20;
	@Input() type = "text";

	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}

	changeValue(event: any) {
		this.valueChange.emit(event.value);
	}
}

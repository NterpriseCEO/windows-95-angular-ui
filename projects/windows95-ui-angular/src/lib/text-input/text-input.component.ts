import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "text-input",
	template: `<div class="text-input-wrapper" [class.disabled] = "disabled">
					<input
						type = "text"
						[disabled] = "disabled"
						[placeholder] = "placeholder"
						[value] = "value"
						(keyup) = "changeValue($event.target)"
						(keydown.backspace) = "changeValue($event.target)"
					>
				</div>`,
	styleUrls: ["text-input.component.scss"]
})
export class TextInput {

	@Input() disabled: boolean = false;
	@Input() placeholder: string = "";
	@Input() value: string = "";
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}

	changeValue(event: any) {
		this.valueChange.emit(event.value);
	}
}

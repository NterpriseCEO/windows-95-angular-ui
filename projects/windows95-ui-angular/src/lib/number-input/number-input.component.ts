import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: "number-input",
	templateUrl: "number-input.component.html",
	styleUrls: ["number-input.component.scss"]
})
export class NumberInput {

	@Input() disabled: boolean = false;
	@Input() placeholder: string = "";
	@Input() value: number = 0;
	@Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

	constructor() {}

	incrementValue() {
		this.value++;
		this.valueChange.emit(this.value);
	}

	decrementValue() {
		this.value--;
		this.valueChange.emit(this.value);
	}

	changeValue(event: any) {
		this.valueChange.emit(event.value);
	}
}

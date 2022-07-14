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
	@Input() min: number = Number.MIN_SAFE_INTEGER;
	@Input() max: number = Number.MAX_SAFE_INTEGER;
	@Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

	timer: any;

	constructor() {}

	incrementValue() {
		this.timer = setInterval(() => {
			if(this.value < this.max) {
				this.value++;
				this.valueChange.emit(this.value);
			}
		}, 250);
	}

	decrementValue() {
		this.timer = setInterval(() => {
			if(this.value > this.min) {
				this.value--;
				this.valueChange.emit(this.value);
			}
		}, 250);
	}

	changeValue(event: any) {
		this.value = event.value;
		this.valueChange.emit(event.value);
	}

	cancelValueChange() {
		clearInterval(this.timer);
	}
}

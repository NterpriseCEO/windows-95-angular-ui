import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
	selector: "password-input",
	templateUrl: "./password-input.component.html",
	styleUrls: ["password-input.component.scss"]
})
export class PasswordInput implements OnChanges{

	passwordStars = "";

	@Input() disabled: boolean = false;
	@Input() placeholder: string = "";
	@Input() value: string = "";

	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		//Sets the amount of stars equal to the length of the password
		if(changes["value"].currentValue !== changes["value"].previousValue) {
			this.passwordStars = "*".repeat(changes["value"].currentValue.length);
		}
	}

	changeValue(event: any) {
		//Sets the amount of stars equal to the length of the password
		this.passwordStars = "*".repeat(event.value.length);
		this.valueChange.emit(event.value);
	}
}

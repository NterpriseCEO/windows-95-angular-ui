import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "checkbox",
	templateUrl: "./checkbox.component.html",
	styleUrls: ["./checkbox.component.scss"]
})
export class Checkbox {
	constructor() { }

	@Input() label: string = "";
	@Input() name = "";
	@Input() value = "";
	@Input() checked = false;
	//Value change
	@Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() disabled: boolean = false;
	//onChange event function
	@Output() onChecked: EventEmitter<Event> = new EventEmitter();

	change(event: Event) {
		const target = event.target as HTMLInputElement;
		this.checkedChange.emit(target.checked);
		
		this.onChecked.emit(event);
	}

}

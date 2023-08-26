import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "file-input",
	templateUrl: "./file-input.component.html",
	styleUrls: ["./file-input.component.scss"]
})
export class FileInput {
	constructor(private elRef: ElementRef) {}

	@Input() text: string = "Select a file";
	@Input() disabled: boolean = false;
	@Input() styleClass: string = "";
	@Input() accepts: string = "";
	@Input() showFileName: boolean = true;

	@Output() onSelect: EventEmitter<Event> = new EventEmitter();

	file: string = "";

	select(event: any) {
		this.file = event.target.files[0].name; 
		this.onSelect.emit(event);
	}

	openModal() {
		if(!this.disabled) {
			this.elRef.nativeElement.getElementsByTagName("input")[0].click();
		}
	}
}

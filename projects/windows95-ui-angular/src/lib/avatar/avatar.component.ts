import { Component, Input } from "@angular/core";

@Component({
	selector: "avatar",
	templateUrl: "./avatar.component.html",
	styleUrls: ["./avatar.component.scss"]
})
export class Avatar {	

	@Input() image: string = "";
	@Input() rounded: boolean = false;
	@Input() size: string = "";
	@Input() backgroundColor: string = "";

	constructor() { }
}

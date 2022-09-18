import { Component, Input, TemplateRef } from "@angular/core";

@Component({
	selector: "tab",
	templateUrl: "./tab.component.html"
})
export class Tab {	

	@Input() tabTitle: string = "Tab"
	@Input() templateRef!: TemplateRef<any>;

	active: boolean = false;

	constructor() { }

	ngOnInit() {
		console.log("tab init", this.templateRef);
	}
}

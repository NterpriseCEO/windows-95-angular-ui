import { Component, Input } from "@angular/core";

@Component({
	selector: "windows-panel",
	template: `<div class = "panel" [class] = "styleClass" ><ng-content></ng-content></div>`,
	styleUrls: ["panel.component.scss"]
})
export class WindowsPanel {

	@Input() styleClass: string = "";

	constructor() { }
}

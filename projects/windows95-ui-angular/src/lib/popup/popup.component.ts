import { Component } from "@angular/core";
import { PopupService } from "./popup-service";

@Component({
	selector: "popup",
	templateUrl: "popup.component.html",	
	styleUrls: ["popup.component.scss"]
})
export class PopupComponent {

	visible: boolean = false;
	title: string = "";
	message: string = "";

	constructor(public popupService: PopupService) {
		this.waitForPopup();
	}

	onReject?: () => void = () => {};
	onConfirm?: () => void = () => {}

	waitForPopup() {
		this.popupService.showPopupSubject.subscribe(properties => {
			this.visible = true;
			this.title = properties.title;
			this.message = properties.message;
			this.onReject = properties.onReject;
			this.onConfirm = properties.onConfirm;
		});
	}

	confirmPopup() {
		this.visible = false;
		this.onConfirm?.();
	}
	rejectPopup() {
		this.visible = false;
		this.onReject?.();
	}
}
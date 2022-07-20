import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PopupProperties } from "./popup-properties";

@Injectable({
	providedIn: "root"
})
export class PopupService {

	properties: PopupProperties = {
		title: "",
		message: "",
		onReject: function (): void {},
		onConfirm: function (): void {}
	};

	public showPopupSubject = new Subject<PopupProperties>();

	constructor() { }

	showPopup(popupProperties: PopupProperties) {
		this.showPopupSubject.next(popupProperties);
	}
}
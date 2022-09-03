import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { PopupAction, PopupProperties } from "./popup-properties";

@Injectable({
	providedIn: "root"
})
export class PopupService implements OnDestroy {

	public actions: PopupAction[] = [];

	properties: PopupProperties = {
		title: "",
		contents: "",
		onReject: () => {},
		onConfirm: (data?: any) => {}
	};

	public showPopupSubject = new Subject<PopupProperties>();

	public hidePopupSubject = new Subject<void>();

	constructor() { }

	showPopup(popupProperties: PopupProperties) {
		this.properties = popupProperties;
		this.showPopupSubject.next(popupProperties);
	}

	//Adds a new action to the popup window
	addAction(action: PopupAction) {
		this.actions = [...this.actions, action];
	}

	confirm(data?: any) {
		this.properties.onConfirm?.(data);
		this.destroyPopup();
	}

	reject() {
		this.properties.onReject?.();
		this.destroyPopup();
	}

	destroyPopup() {
		this.actions = [];
		this.hidePopupSubject.next();
	}

	ngOnDestroy() {
		this.destroyPopup();
	}
}
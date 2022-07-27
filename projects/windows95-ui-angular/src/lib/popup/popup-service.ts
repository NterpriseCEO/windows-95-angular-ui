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
		onReject: function (): void {},
		onConfirm: function (): void {}
	};

	public showPopupSubject = new Subject<PopupProperties>();

	public hidePopupSubject = new Subject<void>();

	constructor() { }

	showPopup(popupProperties: PopupProperties) {
		this.showPopupSubject.next(popupProperties);
	}

	addAction(action: PopupAction) {
		this.actions = [...this.actions, action];
	}

	destroyPopup() {
		this.actions = [];
		this.hidePopupSubject.next();
	}

	ngOnDestroy() {
		this.destroyPopup();
	}
}
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { PopupAction } from "./popup-properties";
import { PopupService } from "./popup-service";

@Component({
	selector: "popup",
	templateUrl: "popup.component.html",	
	styleUrls: ["popup.component.scss"]
})
export class PopupComponent implements AfterViewChecked, OnDestroy {

	visible: boolean = false;
	title: string = "";
	contents: any;

	acceptText: string = "Yes";
	rejectText: string = "No";

	actions: PopupAction[] = [];

	constructor(public popupService: PopupService, private ref: ChangeDetectorRef) {
		this.waitForPopup();
	}

	ngAfterViewChecked() {
		this.ref.detectChanges();
	}

	onReject?: () => void = () => {};
	onConfirm?: () => void = () => {}

	waitForPopup() {
		this.popupService.showPopupSubject.subscribe(properties => {
			this.visible = true;
			this.title = properties.title;
			this.contents = properties.contents;
			this.onReject = properties.onReject;
			this.onConfirm = properties.onConfirm;

			if(properties.acceptText) this.acceptText = properties.acceptText;
			if(properties.rejectText) this.rejectText = properties.rejectText;
		});

		this.popupService.hidePopupSubject.subscribe(() => {
			this.visible = false;
		});
	}

	confirmPopup() {
		this.visible = false;
		this.popupService.destroyPopup();
		this.onConfirm?.();
	}
	rejectPopup() {
		this.visible = false;
		this.popupService.destroyPopup();
		this.onReject?.();
	}

	isText(data: any): data is string {
		return typeof data === 'string';
	};
	ngOnDestroy() {
		this.popupService.showPopupSubject.unsubscribe();
		this.popupService.hidePopupSubject.unsubscribe();
	}
}
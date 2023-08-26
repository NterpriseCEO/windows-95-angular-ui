import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { PopupAction } from "./popup-properties";
import { PopupService } from "./popup-service";

@Component({
	selector: "popup",
	templateUrl: "./popup.component.html",	
	styleUrls: ["./popup.component.scss"]
})
export class PopupComponent implements AfterViewChecked, OnDestroy {

	visible: boolean = false;
	title: string = "";
	contents: any;

	confirmText: string = "Yes";
	rejectText: string = "No";
	showConfirmAction: boolean = true;
	showRejectAction: boolean = true;

	actions: PopupAction[] = [];

	constructor(public popupService: PopupService, private ref: ChangeDetectorRef) {
		this.waitForPopup();
	}

	ngAfterViewChecked() {
		this.ref.detectChanges();
	}

	onReject?: () => void = () => {};
	onConfirm?: (data?: any) => void = () => {}

	waitForPopup() {
		this.popupService.showPopupSubject.subscribe(properties => {
			this.visible = true;
			this.title = properties.title;
			this.contents = properties.contents;
			this.showConfirmAction = properties.showConfirmAction ?? true;
			this.showRejectAction = properties.showRejectAction ?? true;
			this.onReject = properties.onReject;
			this.onConfirm = properties.onConfirm;

			this.confirmText = properties.confirmText ?? "Yes";
			this.rejectText = properties.rejectText ?? "No";
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
	}
}
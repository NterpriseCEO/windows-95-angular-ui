export interface PopupProperties {
	title: string;
	contents: any;
	confirmText?: string;
	rejectText?: string;
	showConfirmAction?: boolean;
	showRejectAction?: boolean;
	onReject?: () => void;
	onConfirm?: () => void;
}

export interface PopupAction{
	text: string;
	action: () => void;
}
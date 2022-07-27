export interface PopupProperties {
	title: string;
	contents: any;
	acceptText?: string;
	rejectText?: string;
	onReject?: () => void;
	onConfirm?: () => void;
}

export interface PopupAction{
	text: string;
	action: () => void;
}
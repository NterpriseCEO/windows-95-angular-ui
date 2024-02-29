export interface PopupProperties {
	title: string;
	contents: any;
	inputData?: any;
	confirmText?: string;
	rejectText?: string;
	showConfirmAction?: boolean;
	showRejectAction?: boolean;
	onReject?: () => void;
	onConfirm?: (data?: any) => void;
}

export interface PopupAction{
	text: string;
	disabled?: boolean;
	action: () => void;
}
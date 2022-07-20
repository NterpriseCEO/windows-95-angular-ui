export interface PopupProperties {
	title: string;
	message: string;
	onReject?: () => void;
	onConfirm?: () => void;
}
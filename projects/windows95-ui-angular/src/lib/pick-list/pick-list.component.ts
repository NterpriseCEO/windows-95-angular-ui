import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
	selector: 'pick-list',
	templateUrl: './pick-list.component.html',
	styleUrls: ['./pick-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickListComponent {

	@Input() items: PickListItem[] | any[] = [];
	@Input() value: any;
	@Input() showBackground: boolean = false;
	@Output() valueChange = new EventEmitter<any>();
	
	selectedItem: PickListItem | PickListSubItem | null = null;
	constructor(private changeDetector: ChangeDetectorRef) {}

	selectParentItem(item: PickListItem) {
		item.selected = true;
		if(this.selectedItem) {
			this.selectedItem.selected = false;
		}
		this.selectedItem = item;
		// Toggles selection of item
		this.valueChange.emit(item.selected? item.data : null);
		this.changeDetector.detectChanges();
	}

	toggleExpandSubItems(item: PickListItem, event: Event) {
		event.stopPropagation();
		item.expanded = !item.expanded;	
		this.changeDetector.detectChanges();
	}

	selectChildItem(subItem: PickListSubItem) {
		subItem.selected = !subItem.selected;
		if(this.selectedItem) {
			this.selectedItem.selected = false;
		}
		this.selectedItem = subItem;
		// Toggles selection of subItem
		this.valueChange.emit(subItem.selected? subItem.data : null);
		this.changeDetector.detectChanges();
	}

	unselectItem() {
		if(this.selectedItem) {
			this.selectedItem.selected = false;
			this.selectedItem = null;
		}
		this.changeDetector.detectChanges();
	}
}

export interface PickListItem {
	displayName: string;
	data: string;
	expanded?: boolean;
	selected?: boolean;
	subItems: PickListSubItem[];
}

export interface PickListSubItem {
	displayName: string;
	selected?: boolean;
	data: string;
}
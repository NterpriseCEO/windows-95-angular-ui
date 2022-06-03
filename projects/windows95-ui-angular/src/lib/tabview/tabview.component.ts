import { AfterContentInit, Component, QueryList, ContentChildren, ChangeDetectorRef } from '@angular/core';
import { Tab } from '../tab/tab.component';

@Component({
	selector: "tab-view",
	templateUrl: "./tabview.component.html",
	styleUrls: ["tabview.component.scss"]
})
export class TabView implements AfterContentInit {

	@ContentChildren(Tab) tabs!: QueryList<Tab>;

	tabTitles: string[] = [];

	activeTab = 0;
	

	constructor(private ref: ChangeDetectorRef) {}

	ngAfterContentInit() {
		let tabs = this.tabs.toArray()
		tabs.forEach(tab => this.tabTitles.push(tab.title));

		tabs[0].active = true;

		this.tabTitles = ([] as string[]).concat(this.tabTitles);
		this.ref.detectChanges();
	}

	showTab(index: number) {
		let tabs = this.tabs.toArray();
		tabs[this.activeTab].active = false;
		
		this.activeTab = index;

		tabs[this.activeTab].active = true;
	}
}

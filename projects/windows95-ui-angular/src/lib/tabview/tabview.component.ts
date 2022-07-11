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
		//Gets list of tab components
		let tabs = this.tabs.toArray()
		//Generates list of tab titles
		tabs.forEach(tab => this.tabTitles.push(tab.title));

		//Sets first tab as active
		tabs[0].active = true;

		//Detects changes so that the tab titles are displayed
		this.tabTitles = ([] as string[]).concat(this.tabTitles);
		this.ref.detectChanges();
	}

	showTab(index: number) {
		//Sets all tabs to inactive
		let tabs = this.tabs.toArray();
		tabs[this.activeTab].active = false;
		
		//Sets the selected tab to active
		this.activeTab = index;
		tabs[this.activeTab].active = true;
	}
}

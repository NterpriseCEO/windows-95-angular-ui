import { AfterContentInit, Component, QueryList, ContentChildren, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { of, skipWhile } from "rxjs";
import { Tab } from "../tab/tab.component";

@Component({
	selector: "tab-view",
	templateUrl: "./tabview.component.html",
	styleUrls: ["tabview.component.scss"]
})
export class TabView implements AfterContentInit, OnChanges {

	@ContentChildren(Tab) tabs!: QueryList<Tab>;

	@Input() selectedTab: number = 0;
	@Input() treatTabsAsPages: boolean = false;

	tabTitles: string[] = [];

	activeTab = 0;

	constructor(
		private ref: ChangeDetectorRef,
		private router: Router
	) {}

	ngOnChanges(changes: SimpleChanges) {
		if(changes["selectedTab"]?.currentValue !== changes["selectedTab"]?.previousValue) {
			of(this.tabs).pipe(
				skipWhile((tabs) => tabs === undefined),
			).subscribe(() => {
				this.showTab(changes["selectedTab"]?.currentValue);
			});
		}
	}

	ngAfterContentInit() {
		//Gets list of tab components
		const tabs = this.tabs.toArray()
		//Generates list of tab titles
		tabs.forEach(tab => this.tabTitles.push(tab.tabTitle));

		this.showTab(this.selectedTab);

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
		//Changes the query parameter to the selected tab on tab change
		if(this.treatTabsAsPages) {
			this.router.navigate([this.router.url.split("?")[0].split("/")[1]], { queryParams: { tab: index } });
		}
		tabs[this.activeTab].active = true;
	}
}

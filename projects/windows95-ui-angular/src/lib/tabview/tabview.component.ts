import { AfterContentInit, Component, QueryList, ContentChildren, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from "@angular/core";
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

	tabTitles: string[] = [];

	activeTab = 0;
	

	constructor(private ref: ChangeDetectorRef) {}

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
		tabs[this.activeTab].active = true;
	}
}

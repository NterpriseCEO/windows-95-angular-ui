import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";

@Component({
	selector: "progress-bar",
	templateUrl: "./progress-bar.component.html",
	styleUrls: ["./progress-bar.component.scss"]
})
export class ProgressBar implements AfterViewInit {

	@Input() progress: number = 0;
	@Input() showAsTiles: boolean = false;

	@Input() hideStatus: boolean = false;

	barsCount: number = 0;

	@ViewChild("progressBar") progressBar!: ElementRef;

	ngAfterViewInit() {
		this.setBarAmount();
	}

	@HostListener("window:resize", ["$event"]) private onResize() {
		this.setBarAmount();
	}

	getProgress() {
		return `calc(${this.progress}% - 4px)`;
	}

	setBarAmount() {
		//% = (progressbar width / 100)*100
		let percentageWidth = (this.progressBar?.nativeElement?.offsetWidth/100)*this.progress;
		//Bars count = (progressbar width / tile width)
		this.barsCount = Math.floor(percentageWidth/17);
	}

	getTileAmount() {
		this.setBarAmount();

		//Creates a new array of length barsCount
		//This is used to create a for loop in the HTML
		return Array(this.barsCount || 0);
	}
}

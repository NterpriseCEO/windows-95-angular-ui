import { Directive, ElementRef, HostListener, Input, OnDestroy } from "@angular/core";

@Directive({
	selector: "[tooltip]",
})
export class TooltipDirective implements OnDestroy {

	span: HTMLElement = document.createElement("span");
	value: string = "";

	@Input() set tooltip(value: any) {
		this.value = value;
		this.span.innerText = value;
	}

	constructor(private eleRef: ElementRef) {
		this.span.classList.add("tooltip");
		document.body.appendChild(this.span);
	}

	@HostListener("mouseover", ["$event"])
	showTooltip(event: any) {
		//On hover: shows the tooltip at the cursor position
		this.span.style.display = this.value?.length > 0 ? "block" : "none";
		this.span.style.top = event.clientY + "px";
		this.span.style.left = event.clientX + "px";
	}

	@HostListener("mouseout", ["$event"])
	hideTooltip(event: KeyboardEvent) {
		this.span.style.display = "none";
	}

	ngOnDestroy() {
		this.span.remove();
	}
}
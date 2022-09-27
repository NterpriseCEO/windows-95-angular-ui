import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[tooltip]',
})
export class TooltipDirective {

	span: HTMLElement = document.createElement('span');

	@Input() set tooltip(value: any) {
		this.span.innerText = value;
	}

	constructor(private eleRef: ElementRef) {
		this.span.classList.add('tooltip');
		document.body.appendChild(this.span);
	}

	@HostListener('mouseover', ['$event'])
	showTooltip(event: any) {
		//On hover: shows the tooltip at the cursor position
		this.span.style.display = 'block';
		this.span.style.top = event.clientY + 'px';
		this.span.style.left = event.clientX + 'px';
	}

	@HostListener('mouseout', ['$event'])
	hideTooltip(event: KeyboardEvent) {
		this.span.style.display = 'none';
	}
}
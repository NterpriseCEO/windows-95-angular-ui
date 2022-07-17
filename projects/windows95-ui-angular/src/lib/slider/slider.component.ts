import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";

@Component({
	selector: "slider",
	templateUrl: "./slider.component.html",
	styleUrls: ["./slider.component.scss"]
})
export class Slider implements OnChanges, AfterViewInit {

	@Input() min: number = 0;
	@Input() max: number = 100;
	@Input() vertical: boolean = false;
	@Input() disabled: boolean = false;
	@Input() incrementBy: number = 0;
	@Input() length: string = "300px";

	@Input() value: number = 10;
	@Output() valueChange = new EventEmitter<number>();

	@ViewChild("slider") slider!: ElementRef;
	sliderElement!: HTMLElement;

	dragging: boolean = false;
	tickAmount: number = 0;

	constructor() {}
	ngAfterViewInit() {
		//refernce to the #slider HTML element
		this.sliderElement = this.slider.nativeElement;

		this.tickAmount = Math.floor((this.max - this.min) / this.incrementBy)+1;
	}

	ngOnChanges(changes: SimpleChanges) {
		if(!this.dragging) {
			//Check if the value has changed and is less than min
			//Or is greater than max
			if(changes["value"]?.currentValue < this.min) {
				this.value = this.max;
				throw new Error("ValueOutOfBoundsError: Value must be between min and max");
			}else if(changes["value"]?.currentValue > this.max) {
				this.value = this.min;
				throw new Error("ValueOutOfBoundsError: Value must be between min and max");
			}
		}

		//Checks if min is greater than max
		if(changes["min"]?.currentValue > changes["max"]?.currentValue) {
			throw new Error("MinGreaterThanMaxError: Min must be less than max");
		}

		if(changes["incrementBy"]?.currentValue != undefined) {
			if(changes["incrementBy"]?.currentValue < 0) {
				throw new Error("IncrementByLessThanZeroError: IncrementBy must be greater than 0");
			}
			this.tickAmount = Math.floor((this.max - this.min) / this.incrementBy)+1;
		}
	}

	//Value for the width of the slider
	getPercentageValue(): number {
		return (this.value - this.min) / (this.max - this.min)*100;
	}

	onDragStart(event: MouseEvent) {
		this.dragging = true;
	}

	onDrag(event: MouseEvent) {
		if(!this.dragging) {
			return;
		}

		//Drag left/right or up/down
		this.vertical ? this.goToYPosition(event): this.goToXPosition(event);
	}

	goToXPosition(event: MouseEvent) {
		const sliderRect = this.sliderElement.getBoundingClientRect();
		//Cursor x position relative to the slider
		const x = event.pageX - sliderRect.left;
		//New percentage position of the handle
		const handlePercentage = x / sliderRect.width;
		
		//New value of the slider
		this.value = Math.floor(this.min + handlePercentage * (this.max - this.min));
		
		const incrementByMod = this.value%this.incrementBy;

		if(incrementByMod >= this.incrementBy/2) {
			this.value += this.incrementBy - incrementByMod;
		}else if(incrementByMod < this.incrementBy/2) {
			this.value -= incrementByMod;
		}

		//Value > max - value = max
		//Value < min - value = min
		this.value = Math.min(Math.max(this.value, this.min), this.max);

		this.valueChange.emit(this.value);
	}

	goToYPosition(event: MouseEvent) {
		const sliderRect = this.sliderElement.getBoundingClientRect();
		//Cursor y position relative to the slider
		// const y = event.pageY-(sliderRect.height + sliderRect.top);
		const y = event.pageY - sliderRect.top;
		//New percentage position of the handle
		const handlePercentage = y / sliderRect.height;
		
		this.value = Math.floor(this.min + handlePercentage * (this.max - this.min));
		const incrementByMod = this.value%this.incrementBy;
		
		if(incrementByMod >= this.incrementBy/2) {
			this.value += this.incrementBy - incrementByMod;
		}else if(incrementByMod < this.incrementBy/2) {
			this.value -= incrementByMod;
		}

		this.value = this.max-Math.min(Math.max(this.value, this.min), this.max);

		this.valueChange.emit(this.value);
	}

	onDragEnd(event: MouseEvent) {
		if(this.dragging) {
			//Prevents click outside of the slider from triggering the drag end event
			this.vertical ? this.goToYPosition(event): this.goToXPosition(event);
		}
		this.dragging = false;
	}

	getTickAmount() {
		if(this.incrementBy === 0) {
			return Array(0);
		}
		return Array(this.tickAmount);
	}
}

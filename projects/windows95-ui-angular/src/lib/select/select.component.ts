import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, AfterViewInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from "@angular/core";

interface Option {name: string, value: string};

@Component({
	selector: "windows-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Select implements OnChanges, AfterViewInit {

	@ViewChild("selectWrapper") selectWrapper: ElementRef = new ElementRef(null);
	@ViewChild("select") select: ElementRef = new ElementRef(null);
	@ViewChild("optionsList") optionsList: ElementRef = new ElementRef(null);
	@ViewChildren('option') option: QueryList<any> = new QueryList<any>();

	showOptions = false;
	focusOptionDisplay = false;

	@Input() options: Option[] = [];
	@Input() disabled: boolean = false;
	@Input() value: string = "";

	@Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();

	optionList: Option[] = [];

	selectedOption: Option | null | undefined = this.options[0];
	hoveredOption: Option | null = null;

	selectedOptionIndex = 0;
	width: number = 50;

	constructor(private changeDetector: ChangeDetectorRef) {}

	@HostListener('document:mousedown', ['$event'])
	onGlobalClick(event: Event) {
		//Hides options if click is outside of selectWrapper
		if (!this.selectWrapper.nativeElement.contains(event.target)) {
			this.showOptions = false;
			this.focusOptionDisplay = false;
		}
	}

	ngAfterViewInit() {
		//Sets width of select to width of selectWrapper
		this.optionList = this.options;

		this.option.changes.subscribe(() => {
			this.width = this.optionsList.nativeElement.offsetWidth;

			//Finds the selected option and sets the selectedOptionIndex
			this.selectedOption = this.optionList.find(option => option.value === this.value);
			this.selectedOptionIndex = this.optionList.findIndex(option => option.value === this.value);
			this.changeDetector.detectChanges();
		});
		this.changeDetector.detectChanges();
	}

	ngOnChanges(changes: SimpleChanges) {
		this.selectedOption = this.optionList.find(option => option.value === this.value);
		this.selectedOptionIndex = this.optionList.findIndex(option => option.value === this.value);

		this.changeDetector.detectChanges();
	}

	displayOptions() {
		this.showOptions = !this.showOptions;
		this.hoveredOption = null;
		this.focusOptionDisplay = !this.showOptions;

		setTimeout(() => {
			this.optionsList.nativeElement.focus();

			const optionElement = this.optionsList.nativeElement.children[this.selectedOptionIndex];
			optionElement?.scrollIntoView({ block: "nearest" });
			this.changeDetector.detectChanges();
		}, 0);
	}

	selectOption(event: any, option?: Option) {
		event.stopPropagation();
		this.showOptions = false;
		this.selectedOption = option ?? this.options[this.selectedOptionIndex];
		this.focusOptionDisplay = true;
		this.changeDetector.detectChanges();
		this.valueChanged.emit(this.selectedOption.value);
	}

	setHoveredOption(option: Option) {
		this.hoveredOption = option;
		this.selectedOptionIndex = this.options.indexOf(option);
		this.optionsList.nativeElement.focus();
		this.changeDetector.detectChanges();
	}

	changeSelectedOption(event: Event, direction: number) {
		event.preventDefault();
		this.selectedOptionIndex += direction;
		//Selects the last option
		if(this.selectedOptionIndex < 0) {
			this.selectedOptionIndex = this.options.length - 1;
		}else if(this.selectedOptionIndex >= this.options.length) {
			//Selects the first option
			this.selectedOptionIndex = 0;
		}

		this.hoveredOption = null;

		//Scrolls to the selected option within the options list
		const optionElement = this.optionsList.nativeElement.children[this.selectedOptionIndex];
		optionElement?.scrollIntoView({block: "nearest"});

		this.selectedOption = this.options[this.selectedOptionIndex];
		this.changeDetector.detectChanges();	
		this.valueChanged.emit(this.selectedOption.value);
	}
}

import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { Params } from "@angular/router";
import { ScrollService } from "./scroll.directive";

@Component({
	selector: "dropdown-menu",
	templateUrl: "dropdown-menu.component.html",
	styleUrls: ["dropdown-menu.component.scss"]
})
export class DropdownMenu implements AfterViewInit{

	@Input() menuItems: MenuItem[] = [];
	@Input() isToolbarDropdown = true;

	@ViewChild("dropdownMenu") dropdownMenu!: ElementRef;

	@ViewChild('menuWrapper') menuWrapper!: ElementRef;

	menu: any;
	wrapper: any;

	hovering:boolean = false;
	hoveringDropdownItems: boolean = false;
	
	constructor(private scrollService: ScrollService) {
		scrollService.scrollSubject.subscribe(() => {
			this.realignMenu();
		});
	}


	ngAfterViewInit() {
		this.menu = this.dropdownMenu.nativeElement;
		this.wrapper = this.menuWrapper.nativeElement;
		
		document.body.appendChild(this.menu);

		this.realignMenu();
	}
	

	checkIfHovering() {
		setTimeout(() => {
			if(!this.hoveringDropdownItems) {
				this.hovering = false;
			}
		}, 1);
	}

	realignMenu() {
		if(this.isInViewport()) {
			let fbr = this.wrapper.getBoundingClientRect();
			let mbr = this.menu.getBoundingClientRect();
			this.menu.style.top = (fbr.top + fbr.height) + "px";
			this.menu.style.left = fbr.left + "px";

			fbr = this.wrapper.getBoundingClientRect();
			mbr = this.menu.getBoundingClientRect();

			if(mbr.left+mbr.width > window.innerWidth) {
				this.menu.style.left = (window.innerWidth - mbr.width) + "px";
			}
			if(mbr.top+mbr.height > window.innerHeight) {
				this.menu.style.top = (fbr.top - mbr.height) + "px";
			}
		}
	}

	isInViewport(): any {
		let fbr = this.wrapper.getBoundingClientRect();
		return (
			fbr.top >= 0 &&
			fbr.left >= 0 &&
			fbr.bottom <= window.innerHeight &&
			fbr.right <= window.innerWidth
		);
	}
}

interface MenuItemCommon {
	text: string;
	queryParams?: Params | null | undefined;
	disabled?: boolean;
}

//Menu items much match one of the following types:
export type MenuItem = ({
	routerLink: string;
	href?: never
	onClick?: never
} | {
	href: string;
	routerLink?: never;
	onClick?: never
} | {
	onClick: () => void;
	routerLink?: never;
	href?: never
}) & MenuItemCommon;
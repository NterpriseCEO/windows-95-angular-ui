import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { Params, Router } from "@angular/router";
import { ScrollService } from "./scroll.directive";

@Component({
	selector: "dropdown-menu",
	templateUrl: "dropdown-menu.component.html",
	styleUrls: ["dropdown-menu.component.scss"]
})
export class DropdownMenu implements AfterViewInit {

	@Input() menuItems: MenuItem[] = [];
	@Input() isToolbarDropdown = true;

	@ViewChild("dropdownMenu") dropdownMenu!: ElementRef;

	@ViewChild('menuWrapper') menuWrapper!: ElementRef;

	menu: any;
	wrapper: any;

	hovering: boolean = false;
	hoveringDropdownItems: boolean = false;
	navigating: boolean = false;

	constructor(
		private scrollService: ScrollService,
		private router: Router,
	) {
		scrollService.scrollSubject.subscribe(() => {
			this.realignMenu();
		});
	}

	routerNavigate(routerLink: string, queryParams: object) {
		this.hoveringDropdownItems = false;

		let params: any = undefined;

		if (queryParams) {
			params = queryParams;
		}

		this.navigating = true;

		//Basically navigates after menu is hidden
		//This prevents the menu from persisting on the page
		setTimeout(() => {
			this.router.navigate([routerLink], { queryParams: params })
				.then(() => {
					this.navigating = false;
				});
		}, 1);
	}

	ngAfterViewInit() {
		this.menu = this.dropdownMenu.nativeElement;
		this.wrapper = this.menuWrapper.nativeElement;

		document.body.appendChild(this.menu);

		this.realignMenu();
	}


	checkIfHovering() {
		setTimeout(() => {
			if (!this.hoveringDropdownItems) {
				this.hovering = false;
			}
		}, 1);
	}

	realignMenu() {
		//Checks if the menu is is visible on screen and
		//realigns the menu to fit within the viewport
		if (this.isInViewport()) {
			let fbr = this.wrapper.getBoundingClientRect();
			let mbr = this.menu.getBoundingClientRect();
			this.menu.style.top = (fbr.top + fbr.height) + "px";
			this.menu.style.left = fbr.left + "px";

			fbr = this.wrapper.getBoundingClientRect();
			mbr = this.menu.getBoundingClientRect();

			//Checks if the menu is overflowing the right side of the screen
			if (mbr.left + mbr.width > window.innerWidth) {
				//Moves the menu to the left
				this.menu.style.left = (window.innerWidth - mbr.width) + "px";
			}
			//Checks if the menu is overflowing the bottom of the screen
			if (mbr.top + mbr.height > window.innerHeight) {
				//Moves the menu up
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
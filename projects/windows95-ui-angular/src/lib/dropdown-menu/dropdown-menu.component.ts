import { Component, Input } from "@angular/core";

@Component({
	selector: "dropdowm-menu",
	templateUrl: "dropdown-menu.component.html",
	styleUrls: ["dropdown-menu.component.scss"]
})
export class DropdownMenu {

	@Input() menuItems: MenuItem[] = [];

}

interface MenuItemCommon {
	text: string;
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
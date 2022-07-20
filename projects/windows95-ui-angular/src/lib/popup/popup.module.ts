import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PopupComponent } from "./popup.component";
import { ButtonModule } from "../button/button.module";
import { WindowComponentModule } from "../window/window.module";
import { PopupService } from "./popup-service";

@NgModule({
	declarations: [
		PopupComponent
	],
	imports: [
		CommonModule,
		ButtonModule,
		WindowComponentModule
	],
	exports: [
		PopupComponent
	],
	providers: [PopupService]
})
export class PopupModule { }

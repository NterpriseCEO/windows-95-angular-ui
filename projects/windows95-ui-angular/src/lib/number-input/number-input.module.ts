import { NgModule } from "@angular/core";
import { NumberInput } from "./number-input.component";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		NumberInput
	],
	imports: [
		FormsModule
	],
	exports: [
		NumberInput
	]
})
export class NumberInputModule { }

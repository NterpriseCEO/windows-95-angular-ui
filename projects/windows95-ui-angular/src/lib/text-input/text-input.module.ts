import { NgModule } from '@angular/core';
import { TextInput } from './text-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		TextInput
	],
	imports: [
		FormsModule
	],
	exports: [
		TextInput
	]
})
export class TextInputModule { }

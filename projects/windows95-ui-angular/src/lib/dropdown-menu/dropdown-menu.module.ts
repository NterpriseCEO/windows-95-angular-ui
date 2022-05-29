import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { DropdownMenu } from './dropdown-menu.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    DropdownMenu
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ButtonModule
  ],
  exports: [
    DropdownMenu
  ]
})
export class DropdownMenuModule { }

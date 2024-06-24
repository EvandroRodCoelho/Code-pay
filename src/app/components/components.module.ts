import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StepsComponent } from './steps/steps.component';

@NgModule({
  declarations: [HeaderComponent, StepsComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, StepsComponent]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StepsComponent } from './steps/steps.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  declarations: [HeaderComponent, StepsComponent, OrderSummaryComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, StepsComponent, OrderSummaryComponent]
})
export class ComponentsModule { }

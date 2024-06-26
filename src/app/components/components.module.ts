import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StepsComponent } from './steps/steps.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { FreePipe } from '../pipe/freePipe';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HeaderComponent, StepsComponent, OrderSummaryComponent, FreePipe],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [HeaderComponent, StepsComponent, OrderSummaryComponent]
})
export class ComponentsModule { }

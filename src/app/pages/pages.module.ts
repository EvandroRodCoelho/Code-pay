import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './compra/conta/conta.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    ContaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports: [ContaComponent, ComponentsModule]
})
export class PagesModule { }

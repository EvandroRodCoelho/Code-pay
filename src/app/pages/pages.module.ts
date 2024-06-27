import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './compra/conta/conta.component';
import { ComponentsModule } from '../components/components.module';
import { EnvioComponent } from './compra/envio/envio.component';
import { PayComponent } from './compra/pay/pay.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContaComponent,
    EnvioComponent,
    PayComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [ContaComponent, ComponentsModule]
})
export class PagesModule { }

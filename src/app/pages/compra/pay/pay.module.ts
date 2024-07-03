import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './pay.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  { path: '', component: PayComponent }
];

@NgModule({
  declarations: [PayComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class PayModule { }

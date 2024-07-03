import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvioComponent } from './envio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  { path: '', component: EnvioComponent }
];

@NgModule({
  declarations: [EnvioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class EnvioModule { }

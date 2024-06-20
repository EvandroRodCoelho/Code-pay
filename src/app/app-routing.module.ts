import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { router } from '../router';


@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}

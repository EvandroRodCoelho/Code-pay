import { Routes } from "@angular/router";
import { ContaComponent } from "./app/pages/compra/conta/conta.component";

export const router: Routes = [
  { path: '', redirectTo: 'compra/conta', pathMatch: 'full' },
  { path: 'compra/conta', component: ContaComponent },
  { path: '**', redirectTo: 'compra/conta', pathMatch: 'full' }
];

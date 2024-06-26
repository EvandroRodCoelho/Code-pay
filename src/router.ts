import { Routes } from "@angular/router";
import { ContaComponent } from "./app/pages/compra/conta/conta.component";
import { EnvioComponent } from "./app/pages/compra/envio/envio.component";

export const router: Routes = [
  { path: '', redirectTo: 'compra/conta', pathMatch: 'full' },
  { path: 'compra/conta', component: ContaComponent },
  { path: 'compra/envio', component: EnvioComponent },
  { path: '**', redirectTo: 'compra/conta', pathMatch: 'full' }
];

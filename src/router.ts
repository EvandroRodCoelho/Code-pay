import { Routes } from "@angular/router";
import { ContaComponent } from "./app/pages/compra/conta/conta.component";
import { EnvioComponent } from "./app/pages/compra/envio/envio.component";
import { PayComponent } from "./app/pages/compra/pay/pay.component";

export const router: Routes = [
  { path: '', redirectTo: 'compra/conta', pathMatch: 'full' },
  { path: 'compra/conta', component: ContaComponent },
  { path: 'compra/envio', component: EnvioComponent },
  { path: 'compra/pagamento', component: PayComponent },
  { path: '**', redirectTo: 'compra/conta', pathMatch: 'full' }
];

import { Routes } from '@angular/router';
import { PayGuard } from './guard/pay.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'compra/conta', pathMatch: 'full' },
  {
    path: 'compra/conta',
    loadChildren: () => import('./pages/compra/conta/conta.module').then(m => m.ContaModule),
  },
  {
    path: 'compra/envio',
    loadChildren: () => import('./pages/compra/envio/envio.module').then(m => m.EnvioModule)
  },
  {
    path: 'compra/pagamento',
    loadChildren: () => import('./pages/compra/pay/pay.module').then(m => m.PayModule),
    canActivate: [PayGuard]
  },
  { path: '**', redirectTo: 'compra/conta', pathMatch: 'full' }
];

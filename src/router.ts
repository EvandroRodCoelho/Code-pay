import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'compra/conta', pathMatch: 'full' },
  {
    path: 'compra/conta',
    loadChildren: () => import('./app/pages/compra/conta/conta.module').then(m => m.ContaModule)
  },
  {
    path: 'compra/envio',
    loadChildren: () => import('./app/pages/compra/envio/envio.module').then(m => m.EnvioModule)
  },
  {
    path: 'compra/pagamento',
    loadChildren: () => import('./app/pages/compra/pay/pay.module').then(m => m.PayModule)
  },
  { path: '**', redirectTo: 'compra/conta', pathMatch: 'full' }
];

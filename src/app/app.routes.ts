import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cart',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'item-form',
    loadComponent: () => import('./pages/item-form/item-form.page').then((m) => m.ItemFormPage),
  }
];

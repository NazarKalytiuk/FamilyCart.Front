import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { MapPage } from '../map/map.page';
import { SettingsPage } from '../settings/settings.page';
import { CartPage } from '../cart/cart.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cart',
        outlet: 'cart',
        component: CartPage
      },
      {
        path: 'map',
        outlet: 'map',
        component: MapPage
      },
      {
        path: 'settings',
        outlet: 'settings',
        component: SettingsPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(cart:cart)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

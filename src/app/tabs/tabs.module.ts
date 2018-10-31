import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { MapPageModule } from '../map/map.module';
import { SettingsPageModule } from '../settings/settings.module';
import { CartPageModule } from '../cart/cart.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    CartPageModule,
    MapPageModule,
    SettingsPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

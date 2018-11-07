import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { Product } from '../core/model/product.model';
import { map } from 'rxjs/operators';
import { List, ActionSheetController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit {
  products: any[];
  @ViewChild('list') list: List;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private productsS: ProductsService, private actionSheetController: ActionSheetController) {

  }
  async ngOnInit() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const p = await this.productsS.getAll();
    p.snapshotChanges().pipe(
      map(e => e.map(v => {
        const obj = { ...v.payload.doc.data(), id: v.payload.doc.id };
        return obj;
      }))
    ).subscribe(async e => {
      loading.dismiss();
      this.products = e;
      // const toast = await this.toastCtrl.create({
      //   message: 'Список було змінено!',
      //   showCloseButton: true,
      //   closeButtonText: 'ОК',
      //   cssClass: 'toast',
      //   duration: 2000
      // });
      // toast.present();
    });
  }

  onCheckboxChange(product: Product) {
    this.productsS.edit(product);
  }

  async delete(product: Product) {
    await this.list.closeSlidingItems();

    const actionSheet = await this.actionSheetController.create({
      header: `Видалити ${product.title}?`,
      buttons: [{
        text: 'Видалити',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.productsS.delete(product);
        }
      }, {
        text: 'Відміна',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}

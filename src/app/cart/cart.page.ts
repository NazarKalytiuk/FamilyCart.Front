import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { Product } from '../core/model/product.model';
import { map, tap, delay } from 'rxjs/operators';
import { List, ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit {
  products: any[] = [];
  @ViewChild('list') list: List;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private storage: Storage,
    private productsS: ProductsService, private actionSheetController: ActionSheetController) {

  }
  async ngOnInit() {
    const user = await this.storage.get('user');
    if (!user) {
      return;
    }
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const p = await this.productsS.getAll();
    p.ref.onSnapshot(s => {
      s.docChanges().forEach(e => {
        console.log(e.type);
        if (e.type === 'modified') {
          const index = this.products.findIndex(w => w.id === e.doc.id);
          const obj: any = { ...e.doc.data(), id: e.doc.id };
          // Object.assign(this.products[index], obj);
          this.products[index].checked = obj.checked;
        } else if (e.type === 'added') {
          const obj = { ...e.doc.data(), id: e.doc.id };
          this.products.push(obj);
        } else if (e.type === 'removed') {
          const index = this.products.findIndex(w => w.id === e.doc.id);
          this.products.splice(index, 1);
        }
      });
    });
    p.get().pipe(
      map(e => e.docs.map(v => {
        const obj = { ...v.data(), id: v.id };
        return obj;
      })),

    ).subscribe(async e => {
      loading.dismiss();
      this.products = e;
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

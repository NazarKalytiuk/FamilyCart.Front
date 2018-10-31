import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  public product: string;

  constructor(private products: ProductsService, private nav: NavController, private toasts: ToastController) { }

  ngOnInit() {
  }

  addProduct() {
    this.products.addProduct({checked: false, title: this.product})
      .catch(e => {
        const toast = this.toasts.create({
          message: 'Сталася помилка',
          duration: 1000
        });
        toast.then(s => s.present());
      });
    this.nav.goBack(true);
  }

}

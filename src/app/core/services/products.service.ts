import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Product } from '../model/product.model';
import { Storage } from '@ionic/storage';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFirestore, private storage: Storage) { }

  async getAll() {
    return this.db.doc(`families/8buvZt37Pkwffmvz89bQ`).collection('products');
  }

  async addProduct(product: Product) {
    const user = await this.storage.get('user');
    const p = {...product, addedBy: user.displayName};
    return this.db.doc(`families/8buvZt37Pkwffmvz89bQ`).collection('products').add(p);
  }

  async edit(product: Product) {
    const doc = this.db.doc(`families/8buvZt37Pkwffmvz89bQ/products/${product.id}`);
    return doc.update(product);
  }

  async delete(product: Product) {
    const doc = this.db.doc(`families/8buvZt37Pkwffmvz89bQ/products/${product.id}`);
    return doc.delete();
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(
    private af: AngularFireAuth,
    private gplus: GooglePlus,
    private pl: Platform,
    private storage: Storage,
    private router: Router,
    private alertCtrl: AlertController,
    private db: AngularFirestore
    ) {
    this.user = this.af.authState;
  }

  ngOnInit() {
    this.af.user.subscribe(u => {
      if (u) {
        this.storage.set('user', u);
        this.storage.set('uid', u.uid);
        const user = {
          uid: u.uid,
          name: u.displayName,
          email: u.email
        };
        this.db.collection('families').doc('8buvZt37Pkwffmvz89bQ').collection('users').doc(user.uid).set(user);
      } else {
        this.storage.remove('user');
        this.storage.remove('uid');
      }
    });
  }

  async googleLogin() {
    if (this.pl.is('cordova')) {
      await this.nativeGoogleLogin();
      this.router.navigate(['/tabs']);
    } else {
      await this.webGoogleLogin();
      this.router.navigateByUrl('/tabs/(cart:cart)');
    }
  }

  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: '337072650415-fqrpk8gdegboa4fq2m2jear42nsfb6pa.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });
      const res =  await this.af.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: error,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async webGoogleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const creddentials = await this.af.auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  }

  signOut() {
    this.af.auth.signOut();
    if (this.pl.is('cordova')) {
      this.gplus.logout();
    }
  }

}

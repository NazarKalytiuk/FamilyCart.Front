import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-setting',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  user: firebase.User;

  constructor(
    private af: AngularFireAuth,
    private gplus: GooglePlus,
    private pl: Platform,
    private storage: Storage,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.af.user.subscribe(u => {
      this.user = u;
    });
  }

  async signOut() {
    try {
      await this.af.auth.signOut();
      if (this.pl.is('cordova')) {
        await this.gplus.logout();
      }
      this.router.navigate(['/login']);
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
}

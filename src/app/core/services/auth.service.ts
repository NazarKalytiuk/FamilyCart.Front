import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFireAuth) { }

  auth() {
    return from(this.afs.auth.signInWithEmailAndPassword('test@example.com', '12345678'))
      .pipe(
        tap(e => localStorage.setItem('uid', e.user.uid))
      );
  }
}

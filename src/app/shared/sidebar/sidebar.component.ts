import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentUser = '';
  subs: Subscription;
  constructor( private authService: AuthService, private store: Store<AppState>,
               private router: Router) { }

  ngOnInit() {
    this.subs = this.store.select('user').subscribe(({ user }) => {
      this.currentUser = user?.nombre;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    });

  }

}

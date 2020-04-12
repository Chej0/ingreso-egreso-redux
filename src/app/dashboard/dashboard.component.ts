import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ieactions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  ieSubs: Subscription;
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.userSubs = this.store.select('user').pipe(
      filter(auth => auth.user !== null)
    ).subscribe(({user}) => {
      this.ieSubs = this.ingresoEgresoService.initIngresoEgresosListener(user.uid).subscribe(ingresosEgresosFB => {
        this.store.dispatch(ieactions.setItems({ items: ingresosEgresosFB}));
      });
    });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.ieSubs.unsubscribe();
  }
}

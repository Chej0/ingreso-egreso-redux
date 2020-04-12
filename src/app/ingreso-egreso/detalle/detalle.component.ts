import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  iesubs: Subscription;
  constructor(private store: Store<AppState>, private ingresoEgresoervice: IngresoEgresoService) { }

  ngOnInit() {
    this.iesubs = this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.ingresosEgresos = items;
    });
  }

  ngOnDestroy() {
    this.iesubs.unsubscribe();
  }


  borrar(uid: string) {
    this.ingresoEgresoervice.borrarIngresoEgreso(uid).then(() => {
      Swal.fire('Borrado', 'Item borrado', 'success');
    }).catch( err => {
      Swal.fire('Error', err.message, 'error');
    });
  }

}

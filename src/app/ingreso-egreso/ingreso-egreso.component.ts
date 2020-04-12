import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo = 'ingreso';
  cargando = false;
  uiSubscription: Subscription;
  constructor(private fb: FormBuilder, private ingrsoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(uis => {
      this.cargando = uis.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  guardar() {
    this.store.dispatch(ui.isLoading());
    if (this.ingresoForm.invalid) { return; }
    const {descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingrsoEgresoService.crearIngresoEgreso(ingresoEgreso).then( (ref) => {
      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion, 'success');
      this.store.dispatch(ui.stopLoafing());
    })
    .catch( err => {
      this.store.dispatch(ui.stopLoafing());
      Swal.fire('Error', err.message, 'error');
    });
  }

}

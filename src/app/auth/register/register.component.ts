import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ui from '../../shared/ui.actions';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  uiSubscription: Subscription;
  cargando = false;
  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState>) { }

  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      correo:   ['', [Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui').subscribe(uis => {
      this.cargando = uis.isLoading;
      console.log('cargando subs');
    });

  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {

    // if ( this.registroForm.invalid ) { return; }
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });


    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        console.log(credenciales);
        this.store.dispatch(ui.isLoading());

        // Swal.close();

        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoafing());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }

}

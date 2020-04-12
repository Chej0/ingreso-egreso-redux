import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unsetItems = createAction('[IngresoEgreso] unsetItem');
export const setItems = createAction(
    '[IngresoEgreso] setItem',
    props<{items: IngresoEgreso[]}>()
);

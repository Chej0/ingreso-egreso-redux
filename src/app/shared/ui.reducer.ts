import { createReducer, on } from '@ngrx/store';
import * as actions from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
   isLoading: false
};

const reducerUI = createReducer(initialState,

    on(actions.isLoading, state => ({ ...state, isLoading: true})),
    on(actions.stopLoafing, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state, action) {
    return reducerUI(state, action);
}

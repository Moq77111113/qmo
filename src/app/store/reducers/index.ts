import { Action, ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { addItem, getItemSuccess, removeItem } from '../actions';
import { State } from '../app.state';


export const initialItemState: ReadonlyArray<{ id: string; kind: string}> = [];

export const itemReducer = createReducer(
  initialItemState,
  on(getItemSuccess, (state, { items }) => state.concat(items)),
  on(removeItem, (state, { itemId, kind }) => state.filter(item => item.id !== itemId && item.kind === kind)),
  on(addItem, (state, {itemId, kind } ) => {
    if (state.find(item => item.id === itemId)) {
      return state;
    }
    return [...state, {id: itemId, kind}];
  })
);
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const reducers: ActionReducerMap<State, Action> = {
  item: itemReducer
};

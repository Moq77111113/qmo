import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../app.state';

export const selectItems = (kind: string) =>
 createSelector(
    (state: State) => state.item,
    (items: Array<{ id: string; kind: string }>) => items.filter(i => i.kind === kind)
);

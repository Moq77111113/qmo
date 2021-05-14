import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
    '[Item List] Add Item',
    props<{ itemId: string; kind: string }>()
);

export const removeItem = createAction(
    '[Item List] Remove Item',
    props<{ itemId: string; kind: string }>()
);

export const getItem = createAction(
    '[Item List] Get Items',
    props<{kind: string}>()
);

export const getItemSuccess = createAction(
    '[Item List] Get Item Success',
    props<{ items: { id: string; kind: string }[] }>()
);

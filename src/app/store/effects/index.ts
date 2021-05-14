import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { ItemService } from '../../services/item.service';
import { getItem } from '../actions';


@Injectable()
export class ItemEffects {

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(getItem),
        exhaustMap(action =>  this.itemService.getItem(action.kind)
            .pipe(
                map(items => ({ type: '[Item List] Get Item Success', items })),
                catchError(() => EMPTY)
            ))
    )
    );
    constructor(
        private actions$: Actions,
        private itemService: ItemService
    ) { }
}

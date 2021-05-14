import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getItem(kind: string): Observable<{kind: string; id: string}[]> {
    // eg: can use an arg ?limit=xy with http ?
    return of([{
      kind,
      id: v4()
    }
    ]);
  }
}

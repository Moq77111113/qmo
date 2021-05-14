import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getItem(kind: string): Observable<{kind: string; id: string}[]> {
    return of([{
      kind,
      id: (Math.random() * 100).toString()
    }
    ]);
  }
}

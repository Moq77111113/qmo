import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { finalize, takeWhile } from 'rxjs/operators';
import { addItem, getItem, removeItem } from '../store/actions';
import { selectItems } from '../store/selectors';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) private content: IonContent;

  public folder: string = null;
  public items$ = new Observable<{ id: string; kind: string }[]>();
  private _max = 30;
  private _fetchInterval = 500;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.items$ = this.store.select(selectItems(this.folder));
    this._fetchOnce();

  }

  fetch(event: any) {
    setTimeout(() => {
      this._fetchOnce();
      event.target.complete();
    }, 1000);

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }
  scrollToBottom() {
    this.content.scrollToBottom(1000);
  }
  add() {
    this.store.dispatch(addItem({ itemId: (Math.random() * 100).toString(), kind: this.folder }));
  }

  remove(item: { kind: string; id: string }) {
    this.store.dispatch(removeItem({ itemId: item.id, kind: item.kind }));
  }

  private _fetchOnce(): void {
    interval(this._fetchInterval).pipe(takeWhile(i => i < this._max)).subscribe(_ => this.store.dispatch(getItem({ kind: this.folder })));
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NsfwService {
  private nsfw = new BehaviorSubject<boolean>(false);
  private statusOfNsfw = this.nsfw.asObservable();
  constructor() {}

  get nsfwStatus() {
    return this.statusOfNsfw;
  }

  toggleNsfw() {
    this.nsfw.next(!this.nsfw.value);
  }
}

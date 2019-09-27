import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoomedImageService {
  private showImg = new BehaviorSubject<boolean>(false);
  private imgPath = new BehaviorSubject<string>('');
  constructor() {}

  get isShown() {
    return this.showImg.asObservable();
  }

  setShown(status?: boolean) {
    this.showImg.next(status || !this.showImg.value);
  }

  get imagePath() {
    return this.imgPath.asObservable();
  }

  setImagePath(path: string) {
    this.imgPath.next(path);
  }
}

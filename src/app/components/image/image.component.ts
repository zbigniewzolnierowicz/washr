import { Component, OnInit, Input } from '@angular/core';
import { ZoomedImageService } from 'src/app/services/zoomed-image.service';
import { NsfwService } from 'src/app/services/nsfw.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() thumbnail: string;
  @Input() fullimg: string;
  @Input() desc: string;
  @Input() nsfw: boolean;
  showImg: boolean;
  showFull = false;

  constructor(public showImgS: ZoomedImageService, private nsfwS: NsfwService) {}

  ngOnInit() {
    this.nsfwS.nsfwStatus.subscribe(status => {
      if (status === true) {
        this.showImg = true;
      } else {
        if (this.nsfw === false) {
          this.showImg = true;
        } else {
          this.showImg = false;
        }
      }
    });
  }

  manageImage() {
    this.showImgS.setShown(true);
    this.showImgS.setImagePath(this.fullimg);
  }
}

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
  isNSFW: Observable<boolean>;
  showFull = false;

  constructor(public showImg: ZoomedImageService, private nsfw: NsfwService) {}

  ngOnInit() {
    this.isNSFW = this.nsfw.nsfwStatus;
  }

  manageImage() {
    this.showImg.setShown(true);
    this.showImg.setImagePath(this.fullimg);
  }
}

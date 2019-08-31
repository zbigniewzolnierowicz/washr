import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Output() fileEvent = new EventEmitter<File>();

  inputFile: File;

  constructor() { }

  ngOnInit() {
  }
  onChange(event) {
    this.inputFile = event.target.files[0];
    this.fileEvent.emit(this.inputFile);
  }
}

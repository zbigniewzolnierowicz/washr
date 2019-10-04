import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadComponent,
      multi: true
    }
  ]
})
export class UploadComponent implements ControlValueAccessor {
  @Input() progress;
  // tslint:disable-next-line: ban-types
  onChange: Function;
  file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = value;
  }

  // tslint:disable-next-line: ban-types
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  // tslint:disable-next-line: ban-types
  registerOnTouched(fn: Function) {}
}

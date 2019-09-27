import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WysiwygComponent),
      multi: true
    }
  ]
})
export class WysiwygComponent implements ControlValueAccessor {
  constructor() {}

  start: number;
  end: number;
  content: FormControl = new FormControl('');

  onChange: () => void;
  onTouched: () => void;

  selectEvent(ev: any) {
    this.start = ev.target.selectionStart;
    this.end = ev.target.selectionEnd;
  }

  format(ev: Event, type: string) {
    ev.preventDefault();
    const text: string = this.content.value || '';
    const startIndex = this.start;
    const endIndex = this.end - this.start;
    const newText = `${text.substr(0, startIndex) || ''}${type}${text.substr(startIndex, endIndex) ||
      ''}${type}${text.substr(this.end, 999) || ''}`;
    this.content.setValue(newText);
  }

  insertHoriRule(ev: Event) {
    ev.preventDefault();
    const text: string = this.content.value || '';
    const newText = text + '\n\n---';
    this.content.setValue(newText);
  }

  writeValue(val: any): void {
    this.content.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.content.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

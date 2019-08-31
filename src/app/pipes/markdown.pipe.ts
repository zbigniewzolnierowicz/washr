import { Pipe, PipeTransform } from '@angular/core';
import { parse, setOptions } from 'marked';
import { highlight } from 'highlight.js';

setOptions({
  sanitize: true,
  highlight: (code, lang) => {
    return highlight(lang, code).value;
  }
});

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  transform(value: any): any {
    if (value && value.length > 0) {
      return parse(value);
    }
    return value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { parse, setOptions } from 'marked';
import { highlight } from 'highlight.js';
import { emojify } from 'node-emoji';

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
  transform(value: string): string {
    if (value && value.length > 0) {
      const replacer = (match: any) => emojify(match);
      value = value.replace(/(:.*:)/g, replacer);
      return parse(value);
    }
    return value;
  }
}

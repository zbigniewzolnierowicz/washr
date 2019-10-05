import { Pipe, PipeTransform } from '@angular/core';
import { Converter } from 'showdown';
import showdownHighlight from 'showdown-highlight';

const parser = new Converter({
  emoji: true,
  extensions: [showdownHighlight]
});

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (value && value.length > 0) {
      return parser.makeHtml(value);
    }
    return value;
  }
}

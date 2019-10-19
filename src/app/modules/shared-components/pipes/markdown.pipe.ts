import { Pipe, PipeTransform } from '@angular/core';
import { Converter } from 'showdown';
import showdownHighlight from 'showdown-highlight';
import 'showdown-twitter';

const parser = new Converter({
  emoji: true,
  strikethrough: true,
  tables: true,
  extensions: [showdownHighlight, 'twitter']
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

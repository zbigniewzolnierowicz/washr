import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeComponent } from './components/badge/badge.component';
import { ImageComponent } from './components/image/image.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { WysiwygComponent } from './components/wysiwyg/wysiwyg.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownPipe } from './pipes/markdown.pipe';

@NgModule({
  declarations: [BadgeComponent, ImageComponent, SpinnerComponent, WysiwygComponent, MarkdownPipe],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [BadgeComponent, ImageComponent, SpinnerComponent, WysiwygComponent, MarkdownPipe]
})
export class SharedComponentsModule {}

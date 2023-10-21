import { BottomToolbarComponent } from './../shared/bottom-toolbar/bottom-toolbar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedPageRoutingModule,
    BottomToolbarComponent,
  ],
  declarations: [FeedPage, CommentsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeedPageModule {}

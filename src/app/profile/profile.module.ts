import { BottomToolbarComponent } from './../shared/bottom-toolbar/bottom-toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { AvatarPhotoComponent } from '../shared/avatar-photo/avatar-photo.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    BottomToolbarComponent,
    AvatarPhotoComponent,
  ],
  declarations: [ProfilePage, EditProfileComponent],
})
export class ProfilePageModule {}

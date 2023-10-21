import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-bottom-toolbar',
  templateUrl: './bottom-toolbar.component.html',
  styleUrls: ['./bottom-toolbar.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class BottomToolbarComponent {
  constructor() {}
}

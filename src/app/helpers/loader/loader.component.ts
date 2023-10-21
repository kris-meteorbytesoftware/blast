import { Component, OnInit } from '@angular/core';
import { IonLoading, IonicModule } from '@ionic/angular';
import { LoaderService } from '../services/loading/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}

import { IonicModule } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class FormErrorsComponent {
  @Input() errors!: any;
  @Input() set item(item: AbstractControl) {
    this.control = item;
  }
  @Input() lines: string = 'none';
  @Input() color: string = 'light';
  control = {} as AbstractControl;
  constructor() {}
}

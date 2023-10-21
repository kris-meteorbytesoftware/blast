import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-voucher-progress-bar',
  templateUrl: './voucher-progress-bar.component.html',
  styleUrls: ['./voucher-progress-bar.component.scss'],
})
export class VoucherProgressBarComponent implements OnInit {
  @Input() id!: number;
  @Input() timeRemaining!: number;
  @Input() duration!: number;
  @Input() forward: boolean = true;
  @Output() removeBlast = new EventEmitter<number>();

  color?: string;
  progress?: number;
  interval: any;
  labelWidth?: number;

  constructor() {}

  ngOnInit() {
    this.build();
    this.interval = setInterval(() => {
      if (this.forward) {
        this.timeRemaining++;
      } else {
        this.timeRemaining--;
      }
      // console.log(this.timeRemaining);
      this.build();
      //this.progress=this.transform( this.time)
    }, 1000);
  }

  build() {
    //if we don't have progress, set it to 0.
    if (!this.progress) {
      this.progress = 0;
    }
    //if we don't have a total aka no requirement, it's 100%.
    if (this.duration === 0) {
      this.duration = this.progress;
    } else if (!this.duration) {
      this.duration = 100;
    }
    //if the progress is greater than the total, it's also 100%.
    if (this.timeRemaining > this.duration) {
      this.progress = 100;
      this.duration = 100;
      clearInterval(this.interval);
    }
    if (this.timeRemaining <= 0) {
      console.log({ 'removing blast expired': this.id });
      this.removeBlast.emit(this.id);
      clearInterval(this.interval);
    }
    this.progress = (this.timeRemaining / this.duration) * 100;
    if (!this.forward) {
      this.progress = 100 - this.progress;
      console.log(this.progress);
      if (this.progress > 80) {
        this.color = 'red';
      } else if (this.progress > 25) {
        this.color = 'yellow';
      } else {
        this.color = 'green';
      }
    } else {
      if (this.progress < 40) {
        this.color = 'red';
      } else if (this.progress < 75) {
        this.color = 'yellow';
      } else {
        this.color = 'green';
      }
    }

    this.labelWidth = this.labelWidth || 10;
  }
}

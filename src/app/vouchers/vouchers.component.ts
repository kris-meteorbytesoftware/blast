import { Component, OnInit } from '@angular/core';
import { BlastService } from '../helpers/services/blast.service';
import { BlastModel } from '../models/blast.model';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss'],
})
export class VouchersComponent implements OnInit {
  feedList: any[] = [];

  constructor(private blastService: BlastService) {}

  ngOnInit() {
    this.blastService.myVouchers().subscribe({
      next: (data) => {
        this.feedList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

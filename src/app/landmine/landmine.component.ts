import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-landmine',
  templateUrl: './landmine.component.html',
  styleUrls: ['./landmine.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class LandmineComponent implements OnInit {
  id: number = 0;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      this.id = params['id'];
    });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  posts = [
    {
      user: {
        username: 'john_doe',
        avatar: 'https://picsum.photos/50/50',
      },
      caption: 'Beautiful sunset',
      image: 'https://picsum.photos/200/300',
    },
    {
      user: {
        username: 'jane_smith',
        avatar: 'https://picsum.photos/50/50',
      },
      caption: 'Yummy food',
      image: 'https://picsum.photos/200/300',
    },
    // Add more posts as needed
  ];
  constructor() {}

  ngOnInit() {}
}

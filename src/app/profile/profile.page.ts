import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BusinessModel } from '../models/business.model';
import { BusinessService } from '../business/business.service';
import { AuthenticationService } from '../helpers/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: UserModel = {} as UserModel;
  bussiness: BusinessModel[] = [] as BusinessModel[];
  profileUrl: string = '';
  profileName: string = '';
  businessId: number = 0;
  // businesses: BusinessModel[];
  showFooterMenu = false;
  expandHeight = '110px';
  profiles: any[] = [];
  constructor(
    private authService: AuthenticationService,
    private businessService: BusinessService
  ) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe((userInfo) => {
      console.log(userInfo, 'subscribe');
      this.user = userInfo || ({} as UserModel);
      this.profileName = `${this.user.firstName} ${this.user.lastName}`;
      if (this.user.business?.name) {
        this.profileName = this.user.business?.name;
        this.profileUrl = this.user.business?.logoUrl;
      }

      this.profiles = [
        {
          text: this.user.username,
          handler: () => {
            this.user.businessId = 0;
            this.user.business = {} as BusinessModel;
            this.authService.saveUser(this.user);
          },
        },
      ];
      this.businessService.myBusiness().subscribe({
        next: (data) => {
          this.bussiness = data;
          this.bussiness.forEach((b) => {
            this.profiles.push({
              text: b.name,
              handler: () => {
                this.user.business = b;
                this.authService.saveUser(this.user);
                console.log(this.user);
              },
            });
          });
        },
        error: (err) => {},
      });
    });
  }

  updatePhoto() {}

  changeBusiness(bussinessId: number) {}
}

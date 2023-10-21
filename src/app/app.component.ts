import { UserModel } from './models/user.model';
import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './helpers/services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
  }
  initializeApp() {
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(
        sessionStorage.getItem('user') || '{}'
      ) as UserModel;
      this.authService.saveUser(user);
    }
    if (!isPlatformBrowser(this.platformId)) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.authService.getUserInfo().subscribe((user) => {
      sessionStorage.setItem('user', JSON.stringify(user));
    });
    // this.authService.getUserPermissions().subscribe((data) => {
    //   sessionStorage.setItem("permissions", JSON.stringify(data));
    // });
  }
}

import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  activeIndex = 0;
  activePageTitle = 'Feed';
  Pages = [
    {
      title: 'Feed',
      url: '',
      icon: 'albums',
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'person',
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'person',
    },
  ];
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

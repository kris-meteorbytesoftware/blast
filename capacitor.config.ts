import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.blastapp',
  appName: 'blastapp',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    // BackgroundRunner: {
    //   label: 'com.blastapp.background.task',
    //   src: 'background.js',
    //   event: 'myCustomEvent',
    //   repeat: true,
    //   interval: 2,
    //   autoStart: false,
    // },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      // backgroundColor: '#ffffffff',
      androidSplashResourceName: 'splash',
      // androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      // androidSpinnerStyle: 'large',
      // iosSpinnerStyle: 'small',
      // spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      // layoutName: 'launch_screen',
      // useDialog: true,
    },
  },
  // server: {
  //   androidScheme: 'https',
  // },
};

export default config;

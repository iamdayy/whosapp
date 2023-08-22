import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.whosapp.app',
  appName: 'whosapp',
  webDir: 'dist',
  server: {
    url: "http://192.168.0.107:5173",
    cleartext: true,
    // androidScheme: 'https'
  }
};

export default config;

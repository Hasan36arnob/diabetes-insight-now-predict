
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3551e3025f13400e9b7c314999086aba',
  appName: 'diabetes-insight-now-predict',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://3551e302-5f13-400e-9b7c-314999086aba.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#4285F4",
      showSpinner: true,
      spinnerColor: "#FFFFFF",
    }
  }
};

export default config;

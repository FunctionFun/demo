import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import App from './navigation/AppNavigator';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App);
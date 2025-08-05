/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { API_URL } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { EventType } from '@notifee/react-native';


// Listen for notification interactions on Foreground
notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'deactivate-button') {
        global.toggleFsacosoFromNotification?.(false); // call your state function
      }
});

// Listen for notification interactions on Background (headless) (no access to components)
notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'deactivate-button') {
      
        console.log('BG ACTION: deactivate-button pressed');
        await AsyncStorage.setItem('lastFsacosoAction', new Date().toISOString());

        // No access to React state here
      const token = await AsyncStorage.getItem('JWT_TOKEN');
      
      if (token) {
        try {
            const res = await fetch(API_URL + 'notFsacosoAnymore', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ token }),
            });
        
            if (res.ok) {
              await AsyncStorage.setItem('isFsacoso', 'false');
              await notifee.cancelNotification('persistent-button').catch((e) => {
                console.warn('Failed to cancel notification:', e.message);
              });
            } else {
              console.warn('POST failed:', await res.text());
            }
        } catch (err) {
            console.error('POST error:', err);
        }
    }
  }});

AppRegistry.registerComponent(appName, () => App);

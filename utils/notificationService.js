// src/utils/notificationService.ts
import notifee, { AndroidImportance } from '@notifee/react-native';

export async function showPersistentNotification() {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'persistent',
    name: 'Persistent Notifications',
    importance: AndroidImportance.LOW,
  });

  await notifee.displayNotification({
    title: 'You are Fsacoso',
    body: 'To turn this off, stop being fsacoso, duuh',
    android: {
      channelId,
      smallIcon: 'ic_launcher', // Must exist in res/drawable
      ongoing: true,
      autoCancel: false,
      pressAction: { id: 'default' },
    },
  });
}

export async function cancelPersistentNotification() {
  await notifee.cancelAllNotifications();
}

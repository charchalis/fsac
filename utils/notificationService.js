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
    id: 'persistent-fsacoso', // 👈 fixed ID prevents duplicates
    title: 'You are Fsacoso',
    body: 'Your friends can see your fsacosity',
    android: {
      channelId,
      smallIcon: 'ic_launcher', // Must exist in res/drawable
      ongoing: true,
      autoCancel: false,
      pressAction: { id: 'default' },
      actions: [
        {
            title: 'Stop being fsacoso',
            pressAction: {
                id: 'deactivate-button', // custom ID you'll handle
                launchActivity: 'default',
            },
        },
        ],
    },
  });
}

export async function cancelPersistentNotification() {
  await notifee.cancelAllNotifications();
}

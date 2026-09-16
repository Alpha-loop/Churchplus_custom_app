export interface AppNotificationData {
  page?: string;

  id?: string;
}

export interface AppNotification {
  title: string;

  body: string;

  data?: AppNotificationData;
}
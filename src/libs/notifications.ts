import {Notification, NotificationSection} from '../api/notifications/types';

export function SeparateNotificationsByTime(array: Notification[]) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let todayItems = array.filter(item => {
    let itemDate = new Date(item.most_recent_timestamp);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate.getTime() === today.getTime();
  });

  let yesterdayItems = array.filter(item => {
    let itemDate = new Date(item.most_recent_timestamp);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate.getTime() === yesterday.getTime();
  });

  let otherItems = array.filter(item => {
    let itemDate = new Date(item.most_recent_timestamp);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate.getTime() < yesterday.getTime();
  });

  const sections: NotificationSection[] = [];
  if (todayItems.length > 0) {
    sections.push({title: 'Today', data: todayItems});
  }
  if (yesterdayItems.length > 0) {
    sections.push({title: 'Yesterday', data: yesterdayItems});
  }
  if (otherItems.length > 0) {
    sections.push({title: 'Earlier', data: otherItems});
  }

  return sections;
}

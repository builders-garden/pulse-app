import {useScrollToTop} from '@react-navigation/native';
import axios from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  Notification,
  NotificationsResponse,
} from '../../api/notifications/types';
import {RequestStatus} from '../../api/types';
import MyLoader from '../../components/MyLoader';
import MyButton from '../../components/buttons/MyButton';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {SeparateNotificationsByTime} from '../../libs/notifications';
import {MyTheme} from '../../theme';
import {ENDPOINT_NOTIFICATIONS} from '../../variables';
import NotificationItem from './components/NotificationItem';

function NotificationsScreen() {
  const authContext = useContext(AuthContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsFetchStatus, setNotificationsFetchStatus] =
    useState<RequestStatus>('idle');
  const [newNotificationsFetchStatus, setNewNotificationsFetchStatus] =
    useState<RequestStatus>('idle');
  const [cursor, setCursor] = useState<string>();
  const formattedNotifications = useMemo(() => {
    return SeparateNotificationsByTime(notifications);
  }, [notifications]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const listRef = useRef(null);

  useScrollToTop(listRef);

  const fetchNotifications = useCallback(async () => {
    setNotificationsFetchStatus('loading');
    try {
      console.log('fetching feed', authContext.state.token);
      const res = await axios.get<NotificationsResponse>(
        ENDPOINT_NOTIFICATIONS,
        {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        },
      );
      console.log('got response', JSON.stringify(res.data));
      setNotificationsFetchStatus('success');
      setNotifications(res.data.result);
      setCursor(res.data.cursor);
    } catch (error) {
      console.error(error);
      setNotificationsFetchStatus('error');
    }
  }, [authContext.state.token]);

  const fetchNewItems = useCallback(async () => {
    try {
      setNewNotificationsFetchStatus('loading');
      console.log('fetching new notifications', cursor);
      const res = await axios.get<NotificationsResponse>(
        `${ENDPOINT_NOTIFICATIONS}?cursor=${cursor}`,
        {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        },
      );
      console.log('got new notifications', JSON.stringify(res.data));
      setNotifications([...notifications, ...res.data.result]);
      if (res.data.cursor) {
        setCursor(res.data.cursor);
      } else {
        setCursor(undefined);
      }
      setNewNotificationsFetchStatus('success');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error fetching new items',
      });
      setNewNotificationsFetchStatus('error');
    }
  }, [authContext.state.token, cursor, notifications]);

  const refreshPage = useCallback(async () => {
    setIsRefreshing(true);
    await fetchNotifications();
    setIsRefreshing(false);
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications, authContext]);

  const renderItem = useCallback(({item}: {item: Notification}) => {
    return <NotificationItem notification={item} />;
  }, []);

  if (notificationsFetchStatus === 'loading' && !isRefreshing) {
    return (
      <View style={styles.loadingCtn}>
        <MyLoader />
      </View>
    );
  } else if (notificationsFetchStatus === 'error') {
    return (
      <View style={styles.errorCtn}>
        <Text>Error fetching notifications</Text>
        <MyButton
          title="Retry"
          onPress={() => {
            fetchNotifications();
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <SectionList
        ref={listRef}
        style={{paddingHorizontal: 15, paddingTop: 15}}
        sections={formattedNotifications}
        windowSize={14}
        refreshing={isRefreshing}
        onRefresh={refreshPage}
        onEndReachedThreshold={1}
        onEndReached={() => {
          if (
            newNotificationsFetchStatus !== 'loading' &&
            notificationsFetchStatus === 'success' &&
            cursor
          ) {
            fetchNewItems();
          }
        }}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
        ListFooterComponent={
          newNotificationsFetchStatus === 'loading' ? (
            <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
              <MyLoader />
            </View>
          ) : (
            <View style={{height: 30}} />
          )
        }
        renderSectionHeader={({section}) => {
          return <Text style={styles.sectionTitle}>{section.title}</Text>;
        }}
        stickySectionHeadersEnabled={false}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  errorCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontFamily: MyTheme.fontBold,
    color: MyTheme.grey400,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default NotificationsScreen;

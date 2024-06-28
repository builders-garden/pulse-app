import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {useScrollToTop} from '@react-navigation/native';
import axios from 'axios';
import React, {
  createRef,
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
  Follow,
  Notification,
  NotificationsResponse,
} from '../../api/notifications/types';
import {RequestStatus} from '../../api/types';
import MyLoader from '../../components/MyLoader';
import ProfileLine from '../../components/ProfileLine';
import MyButton from '../../components/buttons/MyButton';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {groupNotificationsByDay} from '../../libs/notifications';
import {NotificationsStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {ENDPOINT_NOTIFICATIONS} from '../../variables';
import NotificationItem from './components/NotificationItem';

function NotificationsScreen({
  navigation,
}: NotificationsStackScreenProps<'Notifications'>) {
  const authContext = useContext(AuthContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsFetchStatus, setNotificationsFetchStatus] =
    useState<RequestStatus>('idle');
  const [newNotificationsFetchStatus, setNewNotificationsFetchStatus] =
    useState<RequestStatus>('idle');
  const [cursor, setCursor] = useState<string>();
  const [selectedFollowNotification, setSelectedFollowNotification] =
    useState<Notification>();
  const formattedNotifications = useMemo(() => {
    return groupNotificationsByDay(notifications);
  }, [notifications]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const listRef = useRef(null);
  const bottomSheetRef = createRef<BottomSheet>();

  useScrollToTop(listRef);

  const fetchNotifications = useCallback(async () => {
    setNotificationsFetchStatus('loading');
    try {
      // console.log('fetching feed', authContext.state.token);
      const res = await axios.get<NotificationsResponse>(
        ENDPOINT_NOTIFICATIONS,
        {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        },
      );
      // console.log('got response', JSON.stringify(res.data));
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
      // console.log('fetching new notifications', cursor);
      const res = await axios.get<NotificationsResponse>(
        `${ENDPOINT_NOTIFICATIONS}?cursor=${cursor}`,
        {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        },
      );
      // console.log('got new notifications', JSON.stringify(res.data));
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

  const renderSectionListItem = useCallback(
    ({item}: {item: Notification}) => {
      return (
        <NotificationItem
          notification={item}
          onPress={() => {
            if (
              item.type === 'follows' &&
              item.follows &&
              item.follows?.length > 1
            ) {
              setSelectedFollowNotification(item);
              bottomSheetRef.current?.snapToIndex(0);
            }
          }}
        />
      );
    },
    [bottomSheetRef],
  );
  const renderBottomSheetItem = useCallback(
    ({item}: {item: Follow}) => (
      <View style={styles.bottomSheetItemWrapper}>
        <ProfileLine
          profile={item.user}
          onPress={() => {
            bottomSheetRef.current?.close();
            navigation.navigate('Profile', {
              userFid: item.user.fid.toString(),
            });
          }}
        />
      </View>
    ),
    [navigation, bottomSheetRef],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

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
        renderItem={renderSectionListItem}
      />
      <BottomSheet
        snapPoints={['80%']}
        index={-1}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        ref={bottomSheetRef}>
        <BottomSheetFlatList
          style={styles.bottomSheetContent}
          data={selectedFollowNotification?.follows}
          ListHeaderComponent={
            <View style={styles.bottomSheetHeaderCtn}>
              <Text style={styles.bottomSheetHeaderText}>Recent followers</Text>
            </View>
          }
          renderItem={renderBottomSheetItem}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
        />
      </BottomSheet>
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
  bottomSheetContent: {
    backgroundColor: MyTheme.grey100,
  },
  bottomSheetHeaderCtn: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 15,
    backgroundColor: MyTheme.white,
  },
  bottomSheetHeaderText: {
    color: MyTheme.black,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: MyTheme.fontRegular,
  },
  bottomSheetItemWrapper: {
    paddingHorizontal: 15,
  },
});

export default NotificationsScreen;

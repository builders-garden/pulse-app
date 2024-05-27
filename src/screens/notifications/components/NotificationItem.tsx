import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Notification} from '../../../api/notifications/types';
import NewFollowImg from '../../../assets/images/icons/new_follow.svg';
import ReplyImg from '../../../assets/images/icons/quote.svg';
import UpvoteImg from '../../../assets/images/icons/upvote_fill.svg';
import {formatDate} from '../../../libs/date';
import {formatNumber} from '../../../libs/numbers';
import {MyTheme} from '../../../theme';

interface NotificationItemProps {
  notification: Notification;
  customStyle?: StyleProp<ViewStyle>;
}

function NotificationItem({notification, customStyle}: NotificationItemProps) {
  const formattedDate = formatDate(
    new Date(notification.most_recent_timestamp),
  );

  let resHtml;
  if (notification.type === 'follows') {
    if (notification.follows && notification.follows?.length === 1) {
      const newFollowUser = notification.follows[0].user;
      resHtml = (
        <View style={[styles.root, customStyle]}>
          <FastImage
            source={{uri: newFollowUser.pfp_url}}
            style={[styles.icon, styles.iconFollow]}
          />
          <View style={styles.textCtn}>
            <Text style={styles.titleText}>
              {newFollowUser.display_name} followed you
              <Text style={styles.dateText}> · {formattedDate}</Text>
            </Text>
          </View>
        </View>
      );
    } else if (notification.follows && notification.follows?.length > 1) {
      resHtml = (
        <View style={[styles.root, customStyle]}>
          <View style={[styles.icon, styles.iconFollow]}>
            <NewFollowImg color={MyTheme.lightBlue} />
          </View>
          <View style={styles.textCtn}>
            <Text style={styles.titleText}>
              {notification.follows.length} people followed you
              <Text style={styles.dateText}> · {formattedDate}</Text>
            </Text>
          </View>
        </View>
      );
    }
  } else if (notification.type === 'likes') {
    const formatLikes = formatNumber(notification.reactions?.length || 0);
    resHtml = (
      <View style={[styles.root, customStyle]}>
        <View style={[styles.icon, styles.iconLike]}>
          <UpvoteImg color={MyTheme.primaryColor} />
        </View>
        <View style={styles.textCtn}>
          <Text style={styles.titleText}>
            {formatLikes} upvotes on your thread
            <Text style={styles.dateText}> · {formattedDate}</Text>
          </Text>
          <Text style={styles.body} ellipsizeMode="tail" numberOfLines={2}>
            {notification.cast?.text}
          </Text>
        </View>
      </View>
    );
  } else if (notification.type === 'recasts') {
    const formatRecasts = formatNumber(notification.reactions?.length || 0);
    resHtml = (
      <View style={[styles.root, customStyle]}>
        <View style={[styles.icon, styles.iconRecast]}>
          <ReplyImg color={MyTheme.purple} />
        </View>
        <View style={styles.textCtn}>
          <Text style={styles.titleText}>
            {formatRecasts} recasts on your thread
            <Text style={styles.dateText}> · {formattedDate}</Text>
          </Text>
          <Text style={styles.body} ellipsizeMode="tail" numberOfLines={2}>
            {notification.cast?.text}
          </Text>
        </View>
      </View>
    );
  } else if (notification.type === 'reply') {
    resHtml = (
      <View style={[styles.root, customStyle]}>
        <FastImage
          source={{uri: notification.cast?.author.pfp_url}}
          style={[styles.icon, styles.iconFollow]}
        />
        <View style={styles.textCtn}>
          <Text style={styles.titleText}>
            {notification.cast?.author.display_name} commented your thread
            <Text style={styles.dateText}> · {formattedDate}</Text>
          </Text>
          <Text style={styles.body} ellipsizeMode="tail" numberOfLines={2}>
            {notification.cast?.text}
          </Text>
        </View>
      </View>
    );
  } else {
    // mention
    resHtml = (
      <View style={[styles.root, customStyle]}>
        <FastImage
          source={{uri: notification.cast?.author.pfp_url}}
          style={[styles.icon, styles.iconFollow]}
        />
        <View style={styles.textCtn}>
          <Text style={styles.titleText}>
            {notification.cast?.author.display_name} mentioned you
            <Text style={styles.dateText}> · {formattedDate}</Text>
          </Text>
          <Text style={styles.body} ellipsizeMode="tail" numberOfLines={2}>
            {notification.cast?.text}
          </Text>
        </View>
      </View>
    );
  }

  return resHtml;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 4,
    backgroundColor: MyTheme.white,
  },
  icon: {
    padding: 4,
    marginRight: 10,
    borderRadius: 3,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLike: {
    backgroundColor: MyTheme.primaryLightOpacity,
  },
  iconFollow: {
    backgroundColor: MyTheme.lightBlueOpacity,
  },
  iconRecast: {
    backgroundColor: MyTheme.purpleOpacity,
  },
  textCtn: {
    alignSelf: 'center',
    flex: 1,
  },
  titleText: {
    color: MyTheme.black,
    fontFamily: MyTheme.fontRegular,
    marginBottom: 3,
  },
  dateText: {
    color: MyTheme.grey500,
  },
  body: {
    color: MyTheme.grey400,
    fontFamily: MyTheme.fontRegular,
    fontSize: 12,
  },
});

export default NotificationItem;

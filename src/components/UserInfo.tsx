import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MyTheme} from '../theme';
import MyIconButton from './MyIconButton';

interface UserInfoProps {
  title: string;
  titleRight: string;
  subtitle: string;
  icon: string;
  customStyle?: StyleProp<ViewStyle>;
  onTitlePress?: () => void;
  onSubtitlePress?: () => void;
  onImagePress?: () => void;
}

const UserInfo = ({
  title,
  titleRight,
  subtitle,
  icon,
  customStyle,
  onTitlePress,
  onSubtitlePress,
  onImagePress,
}: UserInfoProps) => {
  return (
    <View style={[styles.header, customStyle && customStyle]}>
      <Pressable
        onPress={() => {
          if (onImagePress) {
            onImagePress();
          }
        }}>
        <FastImage style={styles.headerImg} source={{uri: icon}} />
      </Pressable>
      <View style={styles.headerTextCtn}>
        <Pressable
          onPress={() => {
            if (onTitlePress) {
              onTitlePress();
            }
          }}
          style={{flexDirection: 'row'}}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerTime}> • {titleRight}</Text>
        </Pressable>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          onPress={() => {
            if (onSubtitlePress) {
              onSubtitlePress();
            }
          }}
          style={styles.headerSubtitle}>
          {subtitle}
        </Text>
      </View>
      <MyIconButton
        iconSize={25}
        onPress={() => {}}
        style="secondary"
        filling="clear"
        icon={require('../assets/images/icons/vertical_dots.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerImg: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 14,
  },
  headerTextCtn: {
    width: '80%',
    marginRight: 4,
  },
  headerTitle: {
    fontFamily: 'BeVietnamPro-Bold',
    color: MyTheme.black,
  },
  headerTime: {
    color: 'gray',
    fontFamily: 'BeVietnamPro-Regular',
  },
  headerSubtitle: {
    color: 'gray',
    maxWidth: '100%',
    fontFamily: 'BeVietnamPro-Regular',
  },
});

export default UserInfo;

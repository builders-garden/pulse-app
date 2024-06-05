import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {EssentialCast} from '../../../api/cast/types';
import BorderLineImg from '../../../assets/images/thread/border_line.svg';
import {formatDate} from '../../../libs/date';
import {MyTheme} from '../../../theme';

interface CastBoxProps {
  cast: EssentialCast;
  customStyle?: StyleProp<ViewStyle>;
}

function CastBox({cast, customStyle}: CastBoxProps) {
  const postTime = useMemo(() => formatDate(new Date(cast.timestamp)), [cast]);

  return (
    <View style={[styles.root, customStyle && customStyle]}>
      <View style={{alignItems: 'flex-end'}}>
        <BorderLineImg color={MyTheme.grey300} />
        <LinearGradient
          style={styles.border}
          colors={[MyTheme.grey300, MyTheme.grey300]}
        />
      </View>
      <View style={styles.contentCtn}>
        <View style={styles.header}>
          <FastImage
            style={styles.headerImg}
            source={{uri: cast.author.pfp_url}}
          />
          <View style={styles.headerTextCtn}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerTitle}>
              {cast.author.display_name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerSubtitle}>
              {' '}
              • {cast.author.username}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerTime}>
              {' '}
              • {postTime}
            </Text>
          </View>
        </View>
        <Text style={styles.body} numberOfLines={5} ellipsizeMode="tail">
          {cast.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    left: -10,
  },
  border: {
    width: 2,
    flex: 1,
  },
  contentCtn: {
    backgroundColor: MyTheme.white,
    width: '100%',
    padding: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImg: {
    width: 22,
    height: 22,
    borderRadius: 2,
    marginRight: 8,
  },
  headerTextCtn: {
    width: '80%',
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    maxWidth: '35%',
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.black,
  },
  headerSubtitle: {
    color: MyTheme.grey400,
    maxWidth: '30%',
    fontSize: 12,
    fontFamily: MyTheme.fontRegular,
    fontWeight: 'normal',
  },
  headerTime: {
    color: MyTheme.grey400,
    maxWidth: '35%',
    fontSize: 12,
    fontFamily: MyTheme.fontRegular,
    fontWeight: 'normal',
  },
  body: {
    fontSize: 16,
    paddingVertical: 10,
    color: MyTheme.grey400,
  },
  imagesCtn: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 20,
  },
});

export default CastBox;

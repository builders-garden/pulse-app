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
import FollowCounter from '../../../components/FollowCounter';
import {formatNumber} from '../../../libs/numbers';
import {MyTheme} from '../../../theme';

interface ChannelCardProps {
  onPress: () => void;
  imageUrl: string;
  name: string;
  id: string;
  description: string;
  followerCount?: number;
  disabled?: boolean;
  customStyle?: StyleProp<ViewStyle>;
}

const ChannelCard = ({
  disabled,
  customStyle,
  imageUrl,
  name,
  id,
  description,
  followerCount,
  onPress,
}: ChannelCardProps) => {
  const formattedCount = followerCount ? formatNumber(followerCount) : '';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.card,
        pressed && styles.pressedCard,
        disabled && styles.disabledCard,
        customStyle,
      ]}>
      <View style={styles.header}>
        <FastImage source={{uri: imageUrl}} style={styles.headerImg} />
        <View style={styles.headerTextCtn}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {name}
          </Text>
          <View style={styles.headerSubtitleCtn}>
            {followerCount ? (
              <>
                <Text numberOfLines={1} style={styles.headerSubtitle}>
                  /{id} •{' '}
                </Text>

                <FollowCounter
                  count={formattedCount}
                  label=""
                  countCustomStyle={{
                    fontFamily: MyTheme.fontRegular,
                    color: MyTheme.grey400,
                  }}
                />
              </>
            ) : (
              <Text numberOfLines={1} style={styles.headerSubtitle}>
                /{id}
              </Text>
            )}
          </View>
        </View>
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.body]}>
        {description}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: 300,
  },
  pressedCard: {
    opacity: 0.7,
  },
  disabledCard: {
    backgroundColor: 'grey',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  headerTextCtn: {
    marginLeft: 10,
    flex: 1,
  },
  headerTitle: {
    fontFamily: MyTheme.fontBold,
    color: MyTheme.black,
    maxWidth: '90%',
  },
  headerSubtitleCtn: {
    flexDirection: 'row',
  },
  headerSubtitle: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey400,
    maxWidth: '90%',
  },
  headerImg: {
    width: 30,
    height: 30,
    borderRadius: 3,
  },
  body: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey600,
    width: '100%',
  },
  actionButton: {
    marginLeft: 'auto',
    // paddingVertical: 6,
    // paddingHorizontal: 10,
    // alignSelf: 'flex-end',
  },
});

export default ChannelCard;

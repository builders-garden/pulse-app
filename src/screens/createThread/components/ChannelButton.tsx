import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Channel} from '../../../api/channel/types';
import ArrowDownImg from '../../../assets/images/icons/arrow_down.svg';
import {MyTheme} from '../../../theme';

interface ChannelButtonProps {
  channel?: Channel;
  disabled?: boolean;
  loading?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const ChannelButton = ({
  channel,
  disabled,
  loading,
  customStyle,
  onPress,
}: ChannelButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressedBtn,
        disabled && styles.disabledBtn,
        customStyle && customStyle,
      ]}>
      {channel ? (
        <>
          <FastImage style={styles.icon} source={{uri: channel.image_url}} />
          <View style={styles.textCtn}>
            <Text style={styles.buttonText} numberOfLines={1}>
              {channel.name}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              /{channel.id}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.placeholderIcon} />
          <Text style={styles.placeholderText}>Choose a channel</Text>
        </>
      )}

      <View style={styles.rightSection}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ArrowDownImg width={25} height={25} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: MyTheme.white,
    borderWidth: 1,
    borderColor: MyTheme.greyTransparent,
  },
  rightSection: {
    marginLeft: 'auto',
  },
  textCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  subtitle: {
    color: MyTheme.grey400,
    fontSize: 13,
    marginLeft: 8,
    maxWidth: '50%',
  },
  icon: {width: 25, height: 25, marginRight: 10, borderRadius: 2},
  placeholderIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: MyTheme.grey200,
  },
  pressedBtn: {
    opacity: 0.7,
  },
  disabledBtn: {
    backgroundColor: 'grey',
  },
  placeholderText: {
    fontSize: 16,
    color: MyTheme.grey400,
    fontFamily: MyTheme.fontRegular,
  },
  buttonText: {
    fontFamily: MyTheme.fontBold,
    maxWidth: '50%',
  },
});

export default ChannelButton;

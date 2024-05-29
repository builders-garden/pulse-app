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
import ArrowDownImg from '../../../assets/images/icons/arrow_down.svg';
import {MyTheme} from '../../../theme';

interface ChannelButtonProps {
  placeholder: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const ChannelButton = ({
  placeholder,
  title,
  subtitle,
  disabled,
  loading,
  icon,
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
      {icon ? (
        <FastImage style={styles.icon} source={{uri: icon}} />
      ) : (
        <View style={styles.placeholderIcon} />
      )}
      {title ? (
        <View>
          <Text style={styles.buttonText}>{title}</Text>
          {subtitle && (
            <Text style={{color: MyTheme.grey400, fontSize: 12}}>
              {subtitle}
            </Text>
          )}
        </View>
      ) : (
        <Text style={styles.placeholderText}>{placeholder}</Text>
      )}

      <View style={styles.rightSection}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ArrowDownImg style={styles.rightArrow} />
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
  rightArrow: {width: 25, height: 25},
  icon: {width: 25, height: 25, marginRight: 10},
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
    fontSize: 16,
    fontFamily: MyTheme.fontBold,
  },
});

export default ChannelButton;

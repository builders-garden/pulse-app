import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface MyChipProps {
  onPress: () => void;
  title: string;
  style?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  customStyle?: StyleProp<ViewStyle>;
}

const MyChip = ({
  title,
  style = 'primary',
  disabled,
  loading,
  iconLeft,
  iconRight,
  customStyle,
  onPress,
}: MyChipProps) => {
  const btnStyle =
    style === 'primary' ? styles.chipPrimary : styles.chipSecondary;
  const textStyle =
    style === 'primary' ? styles.chipTextPrimary : styles.chipTextSecondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.chip,
        btnStyle,
        disabled && styles.disabledchip,
        customStyle,
      ]}>
      {iconLeft && (
        <Image
          style={{width: 18, height: 18, marginRight: 3}}
          source={iconLeft}
        />
      )}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.chipText, textStyle]}>{title}</Text>
      )}
      {iconRight && (
        <Image
          style={{width: 18, height: 18, marginLeft: 3}}
          source={iconRight}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipPrimary: {
    backgroundColor: 'black',
  },
  chipSecondary: {
    backgroundColor: 'white',
  },
  disabledchip: {
    backgroundColor: 'grey',
  },
  chipText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  chipTextPrimary: {
    color: 'white',
  },
  chipTextSecondary: {
    color: 'black',
  },
});

export default MyChip;

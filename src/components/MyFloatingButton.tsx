import React, {ReactNode} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MyTheme} from '../theme';

interface MyFloatingButtonProps {
  onPress: () => void;
  style?: 'primary' | 'secondary';
  disabled?: boolean;
  icon: ReactNode;
}

const MyFloatingButton = ({disabled, icon, onPress}: MyFloatingButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressedBtn,
        disabled && styles.disabledBtn,
      ]}>
      <LinearGradient
        style={styles.gradient}
        colors={[MyTheme.primaryGradientFirst, MyTheme.primaryGradientSecond]}>
        {icon && icon}
        {/* <Image style={{width: 25, height: 25}} source={icon} /> */}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 2,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: MyTheme.primaryBorder,
  },

  pressedBtn: {
    opacity: 0.7,
  },
  disabledBtn: {
    backgroundColor: 'grey',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MyFloatingButton;

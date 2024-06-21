import {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';

export const useKeyboard = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );

    const hideEventName =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const keyboardHideListener = Keyboard.addListener(hideEventName, () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return keyboardOpen;
};

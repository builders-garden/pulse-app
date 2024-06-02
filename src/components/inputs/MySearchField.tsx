import React, {useState} from 'react';
import {DimensionValue, Keyboard, StyleProp, ViewStyle} from 'react-native';
import CloseImg from '../../assets/images/icons/close.svg';
import SearchImg from '../../assets/images/icons/search.svg';
import {MyTheme} from '../../theme';
import MyInputField from './MyInputField';

interface MySearchFieldProps {
  placeholder?: string;
  value?: string;
  width?: DimensionValue;
  customStyle?: StyleProp<ViewStyle>;
  dismissKeyboardOnCancel?: boolean;
  // debounceTime?: number;
  onCancelPress?: () => void;
  onChangeText?: (text: string) => void;
  // onChangeTextDebounced?: (text: string) => void;
}

const MySearchField = ({
  placeholder,
  value,
  width,
  dismissKeyboardOnCancel,
  // debounceTime,
  customStyle,
  onCancelPress,
  // onChangeTextDebounced,
  onChangeText,
}: MySearchFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  // const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  // useEffect(() => {
  //   return () => {
  //     if (timerId) {
  //       clearTimeout(timerId);
  //     }
  //   };
  // }, [timerId]);

  return (
    <MyInputField
      leftNode={
        <SearchImg
          width={20}
          height={20}
          color={isFocused ? MyTheme.primaryColor : MyTheme.grey500}
        />
      }
      rightNode={
        <CloseImg
          width={20}
          height={20}
          color={MyTheme.grey500}
          onPress={() => {
            if (dismissKeyboardOnCancel) {
              Keyboard.dismiss();
            }
            if (onCancelPress) {
              onCancelPress();
            }
          }}
        />
      }
      placeholder={placeholder}
      value={value}
      width={width}
      customStyle={customStyle}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onChangeText={text => {
        if (onChangeText) {
          onChangeText(text);
        }

        // if (debounceTime !== undefined && debounceTime > 0) {
        //   if (timerId) {
        //     clearTimeout(timerId);
        //   }

        //   setTimerId(
        //     setTimeout(() => {
        //       if (onChangeTextDebounced) {
        //         onChangeTextDebounced(text);
        //       }
        //     }, debounceTime),
        //   );
        // }
      }}
    />
  );
};

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: MyTheme.grey100,
//     borderRadius: 3,
//     padding: 10,
//     margin: 10,
//   },
// });

export default MySearchField;

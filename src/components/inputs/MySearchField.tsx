import React from 'react';
import {DimensionValue, StyleProp, ViewStyle} from 'react-native';
import CloseImg from '../../assets/images/icons/close.svg';
import SearchImg from '../../assets/images/icons/search.svg';
import {MyTheme} from '../../theme';
import MyInputField from './MyInputField';

interface MySearchFieldProps {
  placeholder?: string;
  value?: string;
  width?: DimensionValue;
  customStyle?: StyleProp<ViewStyle>;
  onCancelPress?: () => void;
  onChangeText?: (text: string) => void;
}

const MySearchField = ({
  placeholder,
  value,
  width,
  customStyle,
  onCancelPress,
  onChangeText,
}: MySearchFieldProps) => {
  return (
    <MyInputField
      leftNode={<SearchImg width={20} height={20} color={MyTheme.grey500} />}
      rightNode={
        <CloseImg
          width={20}
          height={20}
          color={MyTheme.grey500}
          onPress={() => {
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
      onChangeText={text => {
        if (onChangeText) {
          onChangeText(text);
        }
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

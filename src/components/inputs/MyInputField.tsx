import React, {ReactNode} from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {MyTheme} from '../../theme';

interface MyInputFieldProps {
  leftNode?: ReactNode;
  rightNode?: ReactNode;
  placeholder?: string;
  width?: DimensionValue;
  customStyle?: StyleProp<ViewStyle>;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const MyInputField = ({
  leftNode,
  rightNode,
  placeholder,
  width,
  customStyle,
  value,
  onChangeText,
  onFocus,
  onBlur,
}: MyInputFieldProps) => {
  return (
    <View style={[styles.root, customStyle && customStyle, {width}]}>
      {leftNode && leftNode}
      <TextInput
        value={value}
        numberOfLines={1}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={text => {
          if (onChangeText) {
            onChangeText(text);
          }
        }}
        onFocus={() => {
          if (onFocus) {
            onFocus();
          }
        }}
        onBlur={() => {
          if (onBlur) {
            onBlur();
          }
        }}
      />
      {rightNode && rightNode}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: MyTheme.grey100,
    borderRadius: 3,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontFamily: MyTheme.fontRegular,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginVertical: 0,
    flex: 1,
    color: MyTheme.black,
  },
});

export default MyInputField;

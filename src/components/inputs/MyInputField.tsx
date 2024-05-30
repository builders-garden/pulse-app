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
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
}

const MyInputField = ({
  leftNode,
  rightNode,
  placeholder,
  width,
  customStyle,
  onChangeText,
  onFocus,
}: MyInputFieldProps) => {
  return (
    <View style={[styles.root, customStyle && customStyle, {width}]}>
      {leftNode && leftNode}
      <TextInput
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
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
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyInputField;

import React from 'react';
import {DimensionValue} from 'react-native';
import CloseImg from '../../assets/images/icons/close.svg';
import SearchImg from '../../assets/images/icons/search.svg';
import {MyTheme} from '../../theme';
import MyInputField from './MyInputField';

interface MySearchFieldProps {
  placeholder?: string;
  width?: DimensionValue;
}

const MySearchField = ({placeholder, width}: MySearchFieldProps) => {
  return (
    <MyInputField
      leftNode={<SearchImg width={20} height={20} color={MyTheme.grey500} />}
      rightNode={<CloseImg width={20} height={20} color={MyTheme.grey500} />}
      placeholder={placeholder}
      width={width}
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

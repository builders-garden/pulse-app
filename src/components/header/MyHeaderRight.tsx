import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import SearchImg from '../../assets/images/icons/search.svg';
import {MyTheme} from '../../theme';
import MyIconButtonBase from '../MyIconButtonBase';

interface MyHeaderRightProps {
  customStyle?: StyleProp<ViewStyle>;
}

const MyHeaderRight = ({customStyle}: MyHeaderRightProps) => {
  // TODO: Implement navigation types
  const navigation = useNavigation<any>();

  return (
    <View style={customStyle}>
      <MyIconButtonBase
        style="tertiary"
        shape="square"
        customStyle={{marginLeft: 15}}
        onPress={() => {
          // console.log('Search button pressed', navigation);
          navigation.navigate('Search');
        }}
        icon={<SearchImg color={MyTheme.grey500} />}
      />
    </View>
  );
};

export default MyHeaderRight;

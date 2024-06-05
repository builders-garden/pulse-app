import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackImg from '../../assets/images/icons/back.svg';
import CloseImg from '../../assets/images/icons/close.svg';
import {MyTheme} from '../../theme';
import MyIconButtonBase from '../MyIconButtonBase';

interface MyHeaderLeftSimpleProps {
  title?: string;
  useCloseIcon?: ReactNode;
  onIconPress?: () => void;
}

const MyHeaderLeftSimple = ({
  title,
  useCloseIcon,
  onIconPress,
}: MyHeaderLeftSimpleProps) => {
  return (
    <View style={styles.headerRoot}>
      <MyIconButtonBase
        style="secondary"
        filling="clear"
        onPress={() => {
          onIconPress && onIconPress();
        }}
        icon={
          useCloseIcon ? (
            <CloseImg width={16} height={16} color={MyTheme.black} />
          ) : (
            <BackImg color={MyTheme.black} />
          )
        }
      />
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerRoot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: MyTheme.fontRegular,
    includeFontPadding: false,
    marginLeft: 15,
    fontSize: 20,
    textAlign: 'left',
    color: MyTheme.black,
  },
});

export default MyHeaderLeftSimple;

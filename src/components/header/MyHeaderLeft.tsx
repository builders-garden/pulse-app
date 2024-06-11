import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useContext} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import MenuLinesImg from '../../assets/images/icons/menu_lines.svg';
import {DrawerContext} from '../../contexts/drawer/Drawer.context';
import {MyTheme} from '../../theme';
import MyIconButtonBase from '../MyIconButtonBase';

interface MyHeaderLeftProps {
  title?: string;
  icon?: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}

const MyHeaderLeft = ({title, icon, customStyle}: MyHeaderLeftProps) => {
  const drawerContext = useContext(DrawerContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.headerRoot, customStyle && customStyle]}>
      <MyIconButtonBase
        style="secondary"
        filling="clear"
        onPress={() => {
          drawerContext.show();
        }}
        icon={<MenuLinesImg color={MyTheme.black} />}
      />
      {icon && <View style={styles.headerIcon}>{icon}</View>}
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerRoot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: 4,
    backgroundColor: MyTheme.primaryLightOpacity,
    marginHorizontal: 10,
    borderRadius: 3,
  },
  headerTitle: {
    fontFamily: MyTheme.fontRegular,
    fontSize: 20,
    textAlign: 'left',
    color: MyTheme.black,
  },
});

export default MyHeaderLeft;

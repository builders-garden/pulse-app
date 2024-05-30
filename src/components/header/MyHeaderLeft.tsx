import React, {ReactNode, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MenuLinesImg from '../../assets/images/icons/menu_lines.svg';
import {DrawerContext} from '../../contexts/drawer/Drawer.context';
import {MyTheme} from '../../theme';
import MyIconButtonBase from '../MyIconButtonBase';

interface MyHeaderLeftProps {
  title: string;
  icon: ReactNode;
}

const MyHeaderLeft = ({title, icon}: MyHeaderLeftProps) => {
  const drawerContext = useContext(DrawerContext);
  return (
    <View style={styles.headerRoot}>
      <MyIconButtonBase
        style="secondary"
        filling="clear"
        customStyle={{marginLeft: 15}}
        onPress={() => {
          drawerContext.show();
        }}
        icon={<MenuLinesImg color={MyTheme.black} />}
      />
      <View style={styles.headerIcon}>{icon}</View>
      <Text style={styles.headerTitle}>{title}</Text>
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

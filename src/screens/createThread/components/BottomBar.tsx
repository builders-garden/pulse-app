import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyChip from '../../../components/MyChip';

type BottomBarProps = {
  onAddMediaPress: () => void;
  onSendPress: () => void;
};

function BottomBar({onAddMediaPress, onSendPress}: BottomBarProps) {
  return (
    <View style={styles.root}>
      <MyChip
        style="primary"
        iconLeft={require('../../../assets/images/icons/plus.png')}
        title="Add media"
        onPress={onAddMediaPress}
        customStyle={styles.chip}
      />
      <MyChip
        style="primary"
        iconLeft={require('../../../assets/images/icons/paperplane.png')}
        title="Send"
        onPress={onSendPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: 'black',
  },
  chip: {},
});

export default BottomBar;

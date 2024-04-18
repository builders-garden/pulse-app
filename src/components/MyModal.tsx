import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

interface MyModalProps {
  // onPress: () => void;
  // title: string;
  // style?: 'primary' | 'secondary';
  // disabled?: boolean;
  // loading?: boolean;
  // iconLeft?: ImageSourcePropType;
  // iconRight?: ImageSourcePropType;
  open: boolean;
}

const MyModal = ({open, children}: PropsWithChildren<MyModalProps>) => {
  return (
    open && (
      <View style={styles.root}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 35,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    zIndex: 1,
  },
});

export default MyModal;

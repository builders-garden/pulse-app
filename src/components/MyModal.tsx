import React, {PropsWithChildren} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

interface MyModalProps {
  // onPress: () => void;
  // title: string;
  // style?: 'primary' | 'secondary';
  // disabled?: boolean;
  // loading?: boolean;
  // iconLeft?: ImageSourcePropType;
  // iconRight?: ImageSourcePropType;
}

const MyModal = ({children}: PropsWithChildren<MyModalProps>) => {
  return (
    <Modal animationType="slide" visible={true} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 35,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    zIndex: 5,
  },
});

export default MyModal;

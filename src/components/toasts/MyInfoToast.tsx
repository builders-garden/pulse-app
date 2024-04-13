import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToast} from 'react-native-toast-message';

function MyInfoToast(props: any) {
  return (
    <BaseToast
      {...props}
      style={styles.root}
      contentContainerStyle={styles.contentCtn}
      text1Style={styles.text1}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black',
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 8,
  },
  contentCtn: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'normal',
  },
});

export default MyInfoToast;

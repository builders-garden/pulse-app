import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

type ThreadItemProps = {
  body: string;
  image?: ImageSourcePropType;
  onChangeText: (text: string) => void;
};

const inputLimit = 1000;

function ThreadItem({body, image, onChangeText}: ThreadItemProps) {
  return (
    <View style={styles.root}>
      <TextInput
        multiline
        maxLength={inputLimit}
        placeholder="Type here!"
        defaultValue={body}
        onChangeText={onChangeText}
      />
      {image && <Image style={styles.image} source={image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderLeftWidth: 3,
    borderLeftColor: 'lightgray',
    paddingLeft: 10,
  },
  image: {
    // height: 300,
    padding: 20,
  },
});

export default ThreadItem;

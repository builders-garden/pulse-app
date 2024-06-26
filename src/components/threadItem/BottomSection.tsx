import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PlusImg from '../../assets/images/icons/plus.svg';
import {MyTheme} from '../../theme';
import MyButtonNew from '../buttons/MyButtonNew';

type BottomSectionProps = {
  characterCount: number;
  maxCharacters: number;
  mediaCount: number;
  maxMedia: number;
  onAddMediaPress: () => void;
};

function BottomSection({
  characterCount,
  maxCharacters,
  mediaCount,
  maxMedia,
  onAddMediaPress,
}: BottomSectionProps) {
  return (
    <View style={styles.bottomSection}>
      <MyButtonNew
        iconLeft={<PlusImg color={MyTheme.grey400} style={{marginRight: 3}} />}
        onPress={onAddMediaPress}
        title={`Add media (${mediaCount}/${maxMedia})`}
        style="quaternary"
        filling="clear"
        size="small"
        customStyle={{marginRight: 10}}
      />
      <Text style={styles.counter}>
        {characterCount}/{maxCharacters}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  counter: {
    fontSize: 12,
    color: MyTheme.grey400,
    fontFamily: MyTheme.fontRegular,
  },
});

export default BottomSection;

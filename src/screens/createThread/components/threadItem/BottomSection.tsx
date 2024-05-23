import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PlusImg from '../../../../assets/images/icons/plus.svg';
import MyButtonNew from '../../../../components/MyButtonNew';
import {MyTheme} from '../../../../theme';

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
        size="small"
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counter: {
    fontSize: 12,
    color: 'gray',
  },
});

export default BottomSection;
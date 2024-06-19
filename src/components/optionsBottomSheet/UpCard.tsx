import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MyTheme} from '../../theme';

interface UpCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

function UpCard({imageUrl, title, subtitle, onPress}: UpCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        onPress && onPress();
      }}>
      <FastImage style={styles.cardImg} source={{uri: imageUrl}} />
      <View style={styles.cardTextCtn}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.cardSubtitle}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: MyTheme.white,
    flex: 1,
  },
  cardImg: {
    width: 30,
    height: 30,
    borderRadius: 2,
    marginRight: 10,
  },
  cardTextCtn: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey700,
    maxWidth: '100%',
  },
  cardSubtitle: {
    color: MyTheme.grey400,
    maxWidth: '100%',
    fontFamily: MyTheme.fontRegular,
  },
});

export default UpCard;

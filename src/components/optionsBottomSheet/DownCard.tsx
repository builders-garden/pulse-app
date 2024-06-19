import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MyTheme} from '../../theme';

interface DownCardProps {
  title: string;
  subtitle: string;
}

function DownCard({title, subtitle}: DownCardProps) {
  return (
    <View style={styles.card}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: MyTheme.white,
    borderRadius: 3,
    flex: 1,
  },
  cardTextCtn: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: MyTheme.fontBold,
    fontSize: 20,
    color: MyTheme.grey500,
    maxWidth: '100%',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: MyTheme.grey400,
    maxWidth: '100%',
    fontFamily: MyTheme.fontRegular,
    textAlign: 'center',
  },
});

export default DownCard;

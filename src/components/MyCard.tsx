import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MyChip from './MyChip';

interface MyCardProps {
  onPress: () => void;
  onButtonPress: () => void;
  title: string;
  subtitle: string;
  body: string;
  buttonText: string;
  horizontal?: boolean;
  disabled?: boolean;
  customStyle?: StyleProp<ViewStyle>;
}

const MyCard = ({
  title,
  subtitle,
  body,
  buttonText,
  horizontal,
  disabled,
  customStyle,
  onPress,
  onButtonPress,
}: MyCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.card,
        pressed && styles.pressedCard,
        disabled && styles.disabledCard,
        customStyle,
        {width: horizontal ? 300 : 170},
      ]}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/placeholders/profile_pic.png')}
          style={styles.headerImg}
        />
        <View style={styles.headerTextCtn}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
        {horizontal && (
          <MyChip
            customStyle={[
              styles.actionButton,
              horizontal && {marginLeft: 'auto'},
            ]}
            onPress={onButtonPress}
            title={buttonText}
          />
        )}
      </View>
      <Text
        numberOfLines={horizontal ? 2 : 5}
        ellipsizeMode="tail"
        style={[styles.body, {marginBottom: horizontal ? 0 : 16}]}>
        {body}
      </Text>
      {!horizontal && (
        <MyChip
          customStyle={styles.actionButton}
          onPress={onButtonPress}
          title={buttonText}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pressedCard: {
    opacity: 0.7,
  },
  disabledCard: {
    backgroundColor: 'grey',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  headerTextCtn: {
    marginLeft: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  headerSubtitle: {
    color: 'gray',
  },
  headerImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  body: {
    color: 'gray',
    width: '100%',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
});

export default MyCard;

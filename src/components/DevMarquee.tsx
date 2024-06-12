import {Marquee} from '@animatereactnative/marquee';
import React from 'react';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MyTheme} from '../theme';

const DevMarquee = () => {
  return (
    <LinearGradient
      colors={[MyTheme.primaryGradientFirst, MyTheme.primaryGradientSecond]}>
      <Marquee speed={0.4}>
        <Text
          numberOfLines={1}
          style={{
            color: MyTheme.white,
            fontSize: 13,
            paddingVertical: 5,
            fontFamily: MyTheme.fontRegular,
          }}>
          alpha version -{' '}
        </Text>
      </Marquee>
    </LinearGradient>
  );
};

export default DevMarquee;

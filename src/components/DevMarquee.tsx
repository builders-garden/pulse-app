import {Marquee} from '@animatereactnative/marquee';
import React from 'react';
import {Text} from 'react-native';
import {MyTheme} from '../theme';

const DevMarquee = () => {
  return (
    <Marquee speed={0.4} style={{backgroundColor: MyTheme.grey200}}>
      <Text
        numberOfLines={1}
        style={{
          color: MyTheme.grey500,
          fontSize: 13,
          paddingVertical: 5,
          fontFamily: MyTheme.fontRegular,
        }}>
        alpha version -{' '}
      </Text>
    </Marquee>
  );
};

export default DevMarquee;

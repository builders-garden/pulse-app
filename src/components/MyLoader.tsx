import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

const MyLoader = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.loader,
        {
          transform: [
            {
              rotate: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
            {perspective: 1000},
          ],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  /* HTML: <div class="loader"></div> */
  loader: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'lightgray',
    borderRightColor: 'black',
    // border: 8px solid lightblue;
    // border-right-color: orange;
    // animation: l2 1s infinite linear;
  },
  // @keyframes l2 {to{transform: rotate(1turn)}}
});

export default MyLoader;

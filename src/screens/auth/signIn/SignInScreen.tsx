import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import MyButton from '../../../components/MyButton';
import {AuthContext} from '../../../contexts/auth/Auth.context';

const padding = 30;

function SignInScreen() {
  const authContext = useContext(AuthContext);

  const width = Dimensions.get('window').width - padding * 2;
  const height = Dimensions.get('window').height * 0.6;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.screenCtn}>
        <Carousel
          width={width}
          height={height}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          renderItem={() => (
            <View style={styles.slide}>
              <Text style={styles.titleText}>
                Experience Farcaster like never before!
              </Text>
              <Text style={styles.bodyText}>
                Lorem ipsum dolor sit amet consectetur. Mi viverra nullam eu at
                id luctus. Amet nisl id.
              </Text>
              <Image
                source={require('../../../assets/images/placeholders/picture.png')}
                style={{
                  width: width,
                  height: height / 2,
                  resizeMode: 'contain',
                }}
              />
            </View>
          )}
        />
        <MyButton
          title="Login with Warpcast"
          iconLeft={require('../../../assets/images/logos/warpcast.png')}
          onPress={() =>
            authContext.signIn({
              token: 'example',
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  screenCtn: {
    padding: padding,
    flex: 1,
    justifyContent: 'space-between',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  slide: {
    justifyContent: 'flex-start',
  },
});

export default SignInScreen;

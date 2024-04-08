import React, {useContext, useState} from 'react';
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

const carouselData = [
  {
    title: 'Experience Farcaster like never before!',
    body: 'Lorem ipsum dolor sit amet consectetur. Mi viverra nullam eu at id luctus. Amet nisl id.',
    image: require('../../../assets/images/placeholders/picture.png'),
  },
  {
    title: 'A social based on conversations',
    body: 'Lorem ipsum dolor sit amet consectetur. Mi viverra nullam eu at id luctus. Amet nisl id.',
    image: require('../../../assets/images/placeholders/picture.png'),
  },
  {
    title: 'Explore and discover Farcaster echosystem',
    body: 'Lorem ipsum dolor sit amet consectetur. Mi viverra nullam eu at id luctus. Amet nisl id.',
    image: require('../../../assets/images/placeholders/picture.png'),
  },
];

const colors = [
  '#26292E',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

function SignInScreen() {
  const authContext = useContext(AuthContext);

  const width = Dimensions.get('window').width - padding * 2;
  const height = Dimensions.get('window').height * 0.6;
  const [activeSlide, setActiveSlide] = useState(0);

  const paginationItems = carouselData.map((_, index) => (
    <View
      key={index}
      style={[
        styles.paginationItem,
        {
          backgroundColor:
            activeSlide === index ? '#636363' : 'rgba(99, 99, 99, 0.2)',
        },
      ]}
    />
  ));

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.screenCtn}>
        <View style={{height}}>
          <Carousel
            loop={false}
            width={width}
            height={height}
            data={carouselData}
            scrollAnimationDuration={500}
            onProgressChange={(_, slideProgress) => {
              console.log(slideProgress);
              const current = Math.floor(slideProgress);
              // const current = Math.max(
              //   0,
              //   Math.min(carouselData.length - 1, Math.round(slideProgress)),
              // );
              if (current !== activeSlide) {
                setActiveSlide(current);
              }
            }}
            renderItem={({item}) => (
              <View style={styles.slide}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.bodyText}>{item.body}</Text>
                <Image
                  source={item.image}
                  style={{
                    width: width,
                    height: height / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            )}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          {paginationItems}
        </View>
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
  paginationItem: {
    width: 15,
    height: 15,
    marginTop: -30,
    marginHorizontal: 5,
    borderRadius: 100,
  },
});

export default SignInScreen;

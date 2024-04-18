import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  AppState,
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Signer} from '../../../api/auth/types';
import {RequestStatus} from '../../../api/types';
import MyButton from '../../../components/MyButton';
import MyLoader from '../../../components/MyLoader';
import MyModal from '../../../components/MyModal';
import {AuthContext} from '../../../contexts/auth/Auth.context';
import {ENDPOINT_SIGNER} from '../../../variables';
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

function SignInScreen() {
  const authContext = useContext(AuthContext);
  const [activeSlide, setActiveSlide] = useState(0);
  const [signerCreateStatus, setSignerCreateStatus] =
    useState<RequestStatus>('idle');
  const [signer, setSigner] = useState<Signer>();
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);
  const [pollCounter, setPollCounter] = useState(0);
  const [signerPollStatus, setSignerPollStatus] =
    useState<RequestStatus>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppStateVisible(nextAppState);
    });

    return () => {
      subscription.remove();
      console.log('AppState subscription removed');
    };
  }, []);

  useEffect(() => {
    if (pollInterval) {
      if (signer?.result.status !== 'pending_approval' || pollCounter > 20) {
        ClearSignerPollLoop();
        setIsModalOpen(false);
        if (signer?.result.status === 'approved' && signer?.result.token) {
          authContext.signIn({
            token: signer?.result.token,
          });
        } else {
          Alert.alert(
            'Error',
            'It was not possible to sign in. Please contact support.',
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, pollCounter, pollInterval]);

  useEffect(() => {
    if (appStateVisible === 'active') {
      if (
        signer?.result.status === 'pending_approval' &&
        pollInterval === null
      ) {
        SignerPollLoop(signer);
      }
    } else {
      console.log(pollInterval);
      if (pollInterval) {
        ClearSignerPollLoop();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStateVisible]);

  const width = Dimensions.get('window').width - padding * 2;
  const height = Dimensions.get('window').height * 0.6;

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

  // Create a signer to authenticate the user
  async function CreateSigner() {
    setSignerCreateStatus('loading');
    try {
      console.log(ENDPOINT_SIGNER);
      const res = await axios.post<Signer>(ENDPOINT_SIGNER);
      console.log('got response');
      console.log(res.data);
      setSigner(res.data);
      setSignerCreateStatus('success');
      return res.data;
    } catch (error) {
      console.error(error);
      setSignerCreateStatus('error');
    }
  }

  // Poll the signer status every 6 seconds
  function SignerPollLoop(in_signer: Signer) {
    console.log('Starting poll loop...');
    const intervalId = setInterval(async () => {
      await SignerPollStatus(in_signer);
      setPollCounter(pollCounter + 1);
    }, 3000);
    setPollInterval(intervalId);
  }

  function ClearSignerPollLoop() {
    if (pollInterval) {
      console.log('Clearing poll loop...');
      clearInterval(pollInterval);
      setPollInterval(null);
      setSignerPollStatus('idle');
    }
  }

  // Poll the signer status to check if the user has approved the signer
  async function SignerPollStatus(in_signer: Signer) {
    setSignerPollStatus('loading');
    try {
      const pollUrl = `${ENDPOINT_SIGNER}${in_signer?.result.signer_uuid}`;
      // console.log(ENDPOINT_SIGNER);
      console.log(pollUrl);
      const res = await axios.get<Signer>(pollUrl);

      if (res.data.result.status === 'pending_approval') {
        return;
      }
      setSigner(res.data);
      setSignerPollStatus('success');
      // clearInterval(pollInterval!);

      // authContext.signIn({
      //   token: 'example',
      // });
    } catch (error) {
      console.error(error);
      setSignerPollStatus('error');
    }
  }

  // Handle the sign in button click
  async function OnSignInButtonClick() {
    setIsModalOpen(true);
    const signerRes = await CreateSigner();
    if (signerRes === undefined) {
      Alert.alert(
        'Error',
        'It was not possible to create a signer. Please contact support.',
      );
      return;
    }

    const isSupported = await Linking.canOpenURL(
      signerRes?.result?.signer_approval_url ?? '',
    );

    if (!isSupported) {
      Alert.alert(
        `Don't know how to open this URL: ${signerRes?.result.signer_approval_url}.`,
      );
      return;
    }

    // SignerPollLoop(signerRes);
    await Linking.openURL(signerRes?.result.signer_approval_url);
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <MyModal open={isModalOpen}>
        <MyLoader />
        <Text style={{marginTop: 10}}>
          {signerCreateStatus === 'loading'
            ? 'Creating signer...'
            : signerPollStatus === 'loading'
            ? 'Waiting for signer approval...'
            : 'Loading...'}
        </Text>
      </MyModal>
      <View style={styles.screenCtn}>
        <View style={{height}}>
          <Carousel
            loop={false}
            width={width}
            height={height}
            data={carouselData}
            scrollAnimationDuration={500}
            onProgressChange={(_, slideProgress) => {
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
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {paginationItems}
        </View>
        <MyButton
          title="Login with Warpcast"
          iconLeft={require('../../../assets/images/logos/warpcast.png')}
          loading={signerCreateStatus === 'loading'}
          onPress={OnSignInButtonClick}
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

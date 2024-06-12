import {NeynarSigninButton} from '@neynar/react-native-signin';
import axios from 'axios';
import React, {useCallback, useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSharedValue} from 'react-native-reanimated';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import Toast from 'react-native-toast-message';
import {SignerResponse} from '../../../api/auth/types';
import {RequestStatus} from '../../../api/types';
import MyFloatingButton from '../../../components/MyFloatingButton';
import MyLoader from '../../../components/MyLoader';
import MyModal from '../../../components/MyModal';
import {AuthContext} from '../../../contexts/auth/Auth.context';
import {MyTheme} from '../../../theme';
import {OnboardingSlide} from '../../../types';
import {ENDPOINT_SIGNER} from '../../../variables';

function SignInScreen() {
  const authContext = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendSignerStatus, setSendSignerStatus] =
    useState<RequestStatus>('idle');

  const width = Dimensions.get('window').width;
  const carouselHeight = Dimensions.get('screen').height * 0.8;

  const renderItem = useCallback(
    ({item}: {item: OnboardingSlide}) => {
      const imgTag = (
        <Image
          source={item.image}
          style={[
            {
              height: carouselHeight * 0.7,
            },
            styles.slideImg,
          ]}
        />
      );
      return (
        <View
          style={[
            styles.slide,
            item.inverted && {
              flexDirection: 'column-reverse',
            },
          ]}>
          {!item.inverted && imgTag}
          <View
            style={[
              styles.slideTextsCtn,
              {
                height: carouselHeight * 0.3 - 40,
              },
            ]}>
            <View style={styles.textBox}>{item.title}</View>
            <View style={styles.textBox}>
              <Text style={styles.bodyText}>{item.body}</Text>
            </View>
          </View>
          {item.inverted && imgTag}
        </View>
      );
    },
    [carouselHeight],
  );

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  async function FetchAuthorizationUrl() {
    try {
      const res = await axios.get(`${ENDPOINT_SIGNER}get-auth-url`);
      return res.data.result.url;
    } catch (error) {
      console.error(error);
    }
  }

  async function SendSignerResponse(fid: string, uuid: string) {
    try {
      setSendSignerStatus('loading');
      const res = await axios.post<SignerResponse>(`${ENDPOINT_SIGNER}`, {
        fid,
        signerUuid: uuid,
      });
      setSendSignerStatus('success');
      return res.data;
    } catch (error) {
      setSendSignerStatus('error');
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send signer',
      });
    }
  }

  async function OnNeynarSuccess(fid: string, uuid: string) {
    setIsModalOpen(true);
    const signerRes = await SendSignerResponse(fid, uuid);
    if (signerRes?.result.token && signerRes?.result.user?.fid) {
      await SignIn(signerRes?.result.token, signerRes?.result.user?.fid);
    }
    setIsModalOpen(false);
  }

  async function storeUserToken(token: string, fid: string) {
    try {
      await EncryptedStorage.setItem('user', JSON.stringify({token, fid}));
    } catch (error) {
      console.error(error);
    }
  }

  async function SignIn(token: string, fid: string) {
    try {
      await storeUserToken(token, fid);
      authContext.signIn({token, fid});
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to sign in',
      });
    }
  }

  // Handle the sign in button click
  async function OnSignInButtonClick() {
    authContext.signIn({
      fid: '409851',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQwOTg1MSwiaWF0IjoxNzEzNzA3NzkyODc4LCJleHAiOjE3MTYyOTk3OTI4Nzh9.BoT-DK88H2jRyv32Se-wslFNhr1YYqyJ_QhZOwPNkBw',
    });
    return;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <MyModal open={isModalOpen}>
        <MyLoader />
        <Text style={{marginTop: 10}}>
          {sendSignerStatus === 'loading' ? 'Syncing signer...' : 'Loading...'}
        </Text>
      </MyModal>
      <View style={styles.screenCtn}>
        <View
          style={{
            height: carouselHeight,
          }}>
          <Carousel
            ref={ref}
            loop={false}
            width={width}
            height={carouselHeight}
            data={carouselData}
            scrollAnimationDuration={500}
            onProgressChange={progress}
            renderItem={renderItem}
          />
        </View>
        {/* <Pagination.Basic
          progress={progress}
          data={carouselData}
          dotStyle={{
            ...styles.paginationDot,
            width: width / carouselData.length - 18,
          }}
          activeDotStyle={styles.paginationActiveDot}
          containerStyle={{
            ...styles.paginationCtn,
            width: width - 30,
          }}
          onPress={onPressPagination}
        /> */}

        {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {paginationItems}
        </View> */}
        <MyFloatingButton icon onPress={OnSignInButtonClick} />

        <View style={styles.warpcastBtnCtn}>
          <NeynarSigninButton
            margin={0}
            successCallback={token => {
              console.log(token);
              if (token.is_authenticated) {
                OnNeynarSuccess(token.fid, token.signer_uuid);
              } else {
                console.log('User is not authenticated');
              }
            }}
            customLogoUrl="https://ik.imagekit.io/buildersgarden/262800_hfXBlvg13"
            text="Sign in with Warpcast"
            buttonStyles={styles.warpcastBtn}
            textStyles={styles.warpcastBtnText}
            backgroundColor={MyTheme.warpcast}
            borderRadius={4}
            errorCallback={error => {
              console.log(error);
            }}
            fetchAuthorizationUrl={FetchAuthorizationUrl}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  screenCtn: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slideTextsCtn: {
    flexDirection: 'row',
    gap: 10,
  },
  textBox: {
    backgroundColor: MyTheme.white,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontFamily: MyTheme.fontLight,
    color: MyTheme.black,
  },
  textHighlight: {
    fontFamily: MyTheme.fontSemiBold,
    fontSize: 24,
    marginTop: 7,
    marginBottom: 5,
    color: MyTheme.black,
  },
  boldText: {
    fontFamily: MyTheme.fontBold,
  },
  bodyText: {
    color: MyTheme.grey400,
    fontFamily: MyTheme.fontRegular,
  },
  slideImg: {
    borderRadius: 8,
    resizeMode: 'cover',
    width: '100%',
  },
  slide: {
    paddingTop: 15,
    paddingHorizontal: 15,
    gap: 10,
    flexDirection: 'column-reverse',
  },
  paginationCtn: {
    padding: 4,
    backgroundColor: MyTheme.white,
    borderRadius: 2,
    marginBottom: 10,
  },
  paginationDot: {
    backgroundColor: MyTheme.grey200,
    height: 6,
    borderWidth: 2,
    borderColor: MyTheme.white,
  },
  paginationActiveDot: {backgroundColor: MyTheme.primaryColor},
  warpcastBtnCtn: {
    width: '100%',
    paddingHorizontal: 15,
  },
  warpcastBtn: {
    width: '100%',
  },
  warpcastBtnText: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.white,
  },
});

const carouselData: OnboardingSlide[] = [
  {
    title: (
      <>
        <Text style={styles.titleText}>Finally enjoy</Text>
        <Text style={styles.textHighlight}>THREADS</Text>
        <Text style={styles.titleText}>on Farcaster</Text>
      </>
    ),
    body: 'Stringz is the client focused on offering an enhanced content experience and long conversations!',
    image: require('../../../assets/images/onboarding/screen.jpg'),
  },
  // {
  //   title: (
  //     <Text>
  //       Finally enjoy{' '}
  //       <Text
  //         style={{
  //           fontFamily: MyTheme.fontBold,
  //         }}>
  //         threads
  //       </Text>{' '}
  //       on Farcaster
  //     </Text>
  //   ),
  //   body: 'Lorem ipsum dolor sit amet consectetur. Mi viverra nullam eu at id luctus. Amet nisl id.',
  //   image: require('../../../assets/images/onboarding/screen.jpg'),
  //   inverted: true,
  // },
  // {
  //   title: (
  //     <Text>
  //       Enhanced{' '}
  //       <Text
  //         style={{
  //           fontFamily: MyTheme.fontBold,
  //         }}>
  //         content
  //       </Text>{' '}
  //       experience
  //     </Text>
  //   ),
  //   body: 'Lorem ipsum dolor sit amet consectetur. Mi viverra nullam eu at id luctus. Amet nisl id.',
  //   image: require('../../../assets/images/onboarding/screen.jpg'),
  // },
];

export default SignInScreen;

import {NeynarSigninButton} from '@neynar/react-native-signin';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Carousel from 'react-native-reanimated-carousel';
import Toast from 'react-native-toast-message';
import {SignerResponse} from '../../../api/auth/types';
import {RequestStatus} from '../../../api/types';
import MyButton from '../../../components/MyButton';
import MyLoader from '../../../components/MyLoader';
import MyModal from '../../../components/MyModal';
import {AuthContext} from '../../../contexts/auth/Auth.context';
import {MyTheme} from '../../../theme';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendSignerStatus, setSendSignerStatus] =
    useState<RequestStatus>('idle');

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

  // async function retrieveUserToken() {
  //   try {
  //     const token = await EncryptedStorage.getItem('user_token');

  //     if (token !== undefined) {
  //       return token;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // }

  async function storeUserToken(token: string) {
    try {
      await EncryptedStorage.setItem('user_token', token);
    } catch (error) {
      console.error(error);
    }
  }

  async function SignIn(token: string, fid: string) {
    try {
      await storeUserToken(token);
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
    // authContext.signIn({
    //   fid: '409851',
    //   token:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQwOTg1MSwiaWF0IjoxNzEzNzA3NzkyODc4LCJleHAiOjE3MTYyOTk3OTI4Nzh9.BoT-DK88H2jRyv32Se-wslFNhr1YYqyJ_QhZOwPNkBw',
    // });
    authContext.signIn({
      fid: '262800',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI2MjgwMCwiaWF0IjoxNzE1OTMzMzI0NTM0LCJleHAiOjE3MTY1MzgxMjQ1MzR9.t1hFsVaL62LGP_1CZZ1TECZvre8W7D3YekwWZEfE0i8',
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
        <MyButton title="DEV login" onPress={OnSignInButtonClick} />

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
          errorCallback={error => {
            console.log(error);
          }}
          fetchAuthorizationUrl={FetchAuthorizationUrl}
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
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: MyTheme.black,
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
    color: MyTheme.black,
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

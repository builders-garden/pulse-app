import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import axios, {CancelToken} from 'axios';
import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {
  Channel,
  ChannelsResponse,
  MostRecentChannelsResponse,
} from '../../api/channel/types';
import {RequestStatus} from '../../api/types';
import DiagonalArrowImg from '../../assets/images/icons/diagonal_arrow.svg';
import PlusImg from '../../assets/images/icons/plus.svg';
import MyChipBase from '../../components/MyChipBase';
import MyLoader from '../../components/MyLoader';
import MyButton from '../../components/buttons/MyButton';
import MyButtonNew from '../../components/buttons/MyButtonNew';
import MySearchField from '../../components/inputs/MySearchField';
import ThreadItem from '../../components/threadItem/ThreadItem';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {RootStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {Thread} from '../../types';
import {
  ENDPOINT_CAST,
  ENDPOINT_CHANNELS,
  ENDPOINT_PROFILE,
} from '../../variables';
import ChannelButton from './components/ChannelButton';
const maxImagesCount = 2;
const inputLimit = 320;

function CreateThreadScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateThread'>) {
  const authContext = useContext(AuthContext);
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(
    route.params.channel ? route.params.channel : undefined,
  );
  const [publishStatus, setPublishStatus] = useState<RequestStatus>('idle');
  const [searchText, setSearchText] = useState('');
  const [allChannels, setAllChannels] = useState<Channel[]>([]);
  const [recentChannels, setRecentChannels] = useState<Channel[]>([]);
  const [recentChannelsFetchStatus, setRecentChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [allChannelsFetchStatus, setAllChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [threads, setThreads] = useState<Thread[]>([
    {id: uuid.v4().toString(), body: '', images: [], links: []},
  ]);
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);
  const inputRef = createRef<TextInput>();
  const bottomSheetRef = createRef<BottomSheet>();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderHeaderRight = useCallback(
    () => (
      <MyButtonNew
        style="primary"
        iconRight={<DiagonalArrowImg style={{marginLeft: 3}} />}
        onPress={() => {
          onPublishPress();
        }}
        title="Publish"
      />
    ),
    [],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  const renderedChannelChips = useMemo(
    () =>
      allChannels.map((item: Channel) => {
        return (
          <MyChipBase
            key={item.id}
            title={`/${item.id}`}
            size="small"
            iconLeft={
              <FastImage
                style={styles.channelChipImg}
                source={{uri: item.image_url}}
              />
            }
            style="tertiary"
            customStyle={styles.channelChip}
            textCustomStyle={{color: MyTheme.grey500}}
            onPress={() => {
              setSelectedChannel(item);
              bottomSheetRef.current?.close();
            }}
          />
        );
      }),
    [allChannels, bottomSheetRef],
  );
  const renderedRecentChips = useMemo(
    () =>
      recentChannels.map((item: Channel) => {
        return (
          <MyChipBase
            key={item.id}
            title={`/${item.id}`}
            size="small"
            iconLeft={
              <FastImage
                style={styles.channelChipImg}
                source={{uri: item.image_url}}
              />
            }
            style="tertiary"
            customStyle={styles.channelChip}
            textCustomStyle={{color: MyTheme.grey500}}
            onPress={() => {
              setSelectedChannel(item);
              bottomSheetRef.current?.close();
            }}
          />
        );
      }),
    [recentChannels, bottomSheetRef],
  );

  const handleSearchChannel = useCallback(
    async (cancelToken: CancelToken | undefined = undefined) => {
      if (authContext.state?.fid) {
        setAllChannelsFetchStatus('loading');
        try {
          const finalUrl =
            ENDPOINT_CHANNELS + '?limit=10&idOrName=' + searchText;
          console.log('searching profiles', finalUrl);
          const res = await axios.get<ChannelsResponse>(finalUrl, {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
            cancelToken: cancelToken,
          });
          console.log('got response', res.data.result);
          // console.log('got response');
          setAllChannels(res.data.result.channels.slice(0, 50));
          setAllChannelsFetchStatus('success');
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error);
            setAllChannelsFetchStatus('error');
          }
        }
      }
    },
    [authContext, searchText],
  );

  const handleSearch = useCallback(() => {
    if (searchText.length > 0) {
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        handleSearchChannel(source.token);
      }, 500);
      return () => {
        console.log('cancelling request');
        clearTimeout(timeout);
        source.cancel();
      };
    } else {
      setAllChannels([]);
      setAllChannelsFetchStatus('idle');
    }
  }, [searchText, handleSearchChannel]);

  const fetchRecentChannels = useCallback(async () => {
    console.log('fetching recents');
    setRecentChannelsFetchStatus('loading');
    try {
      const finalUrl =
        ENDPOINT_PROFILE + '/' + authContext.state.fid + '/active-channels';
      const res = await axios.get<MostRecentChannelsResponse>(finalUrl, {
        headers: {Authorization: `Bearer ${authContext.state.token}`},
      });
      setRecentChannels(res.data.result.slice(0, 10));
      setRecentChannelsFetchStatus('success');
    } catch (error) {
      console.error(error);
      setRecentChannelsFetchStatus('error');
    }
  }, [authContext.state.token, authContext.state.fid]);

  useEffect(() => {
    fetchRecentChannels();
  }, [fetchRecentChannels]);
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  // useEffect(() => {
  //   console.log('change ref', inputRef.current);
  //   if (inputRef.current !== null) {
  //     inputRef.current?.focus();
  //   }
  // }, [inputRef]);

  async function onAddMediaPress(threadIndex: number) {
    if (
      threads[threadIndex].images.length < maxImagesCount &&
      !threads[threadIndex].video
    ) {
      let mediaType: MediaType = 'mixed';
      if (threads[threadIndex].images.length > 0) {
        mediaType = 'photo';
      }
      const res = await launchImageLibrary({
        mediaType: mediaType,
        selectionLimit: 1,
        includeBase64: true,
      });
      console.log(res);
      if (!res.didCancel) {
        const isVideo = res.assets?.[0]?.type?.startsWith('video');
        const mediaUri = res.assets?.[0]?.uri;
        if (mediaUri !== undefined && mediaUri !== null) {
          const newThreads = [...threads];
          if (isVideo) {
            newThreads[threadIndex] = {
              ...newThreads[threadIndex],
              video: mediaUri,
            };
          } else {
            newThreads[threadIndex] = {
              ...newThreads[threadIndex],
              images: [...newThreads[threadIndex].images, mediaUri],
            };
          }
          setThreads(newThreads);
        }
      }
    } else {
      Toast.show({
        type: 'info',
        text1: "You can't upload more than 2 images or 1 video!",
        text2: 'Create another thread to upload more images.',
        topOffset: 50,
      });
    }
  }
  async function onCancelMediaPress(threadIndex: number, mediaIndex: number) {
    const newThreads = [...threads];
    if (newThreads[threadIndex].video) {
      delete newThreads[threadIndex].video;
    } else {
      newThreads[threadIndex].images = newThreads[threadIndex].images.filter(
        (el, i) => i !== mediaIndex,
      );
    }
    setThreads(newThreads);
  }

  async function onAddThreadPress() {
    let newThreads = [...threads];
    newThreads = insertThread(newThreads, newThreads.length);
    // console.log(newThreads);
    setThreads(newThreads);
    setCurrentThreadIndex(newThreads.length - 1);
  }

  function insertThread(threadsList: Thread[], index: number) {
    const newThreads = [...threadsList];
    const left = newThreads.slice(0, index);
    const right = newThreads.slice(index);
    left.push({
      id: uuid.v4().toString(),
      body: '',
      images: [],
      video: '',
      links: [],
    });
    return [...left, ...right];
  }

  function onThreadChangeText(newText: string, index: number) {
    // console.log('onChangeText:', newText.endsWith('\n\n\n'));
    if (newText.endsWith('\n\n\n')) {
      // let slicedText = newText.replace(/\n\n\n$/, '');
      const slicedText = newText.trimEnd();
      let newThreads = [...threads];
      newThreads[index] = {...newThreads[index], body: slicedText};
      newThreads = insertThread(newThreads, index + 1);
      setThreads(newThreads);
      setCurrentThreadIndex(index + 1);
    } else {
      const newThreads = threads.slice();
      newThreads[index] = {...newThreads[index], body: newText};
      setThreads(newThreads);
    }
  }

  function onKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) {
    // console.log('---------');
    // console.log('onKeyPress:', e.nativeEvent.key);
    if (index === currentThreadIndex && threads[index].body.length === 0) {
      // console.log('onKeyPress triggered');
      if (e.nativeEvent.key === 'Backspace' && threads.length > 1) {
        const newThreads = threads.slice();
        newThreads.splice(index, 1);
        setThreads(newThreads);
        if (index > 0) {
          setCurrentThreadIndex(index - 1);
        }
      }
    } else if (threads[index].body.length === inputLimit) {
      if (e.nativeEvent.key === 'Enter') {
        let newThreads = [...threads];
        newThreads = insertThread(newThreads, index + 1);
        // console.log(newThreads);
        setThreads(newThreads);
        setCurrentThreadIndex(index + 1);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Input limit reached!',
          text2: 'Please create another thread to continue.',
          topOffset: 50,
        });
      }
    }
  }

  const publish = useCallback(async () => {
    setPublishStatus('loading');
    // route.params.channelId
    try {
      console.log('publishing thread...');
      const data = new FormData();
      data.append('name', 'avatar');
      data.append('fileData', {
        uri: threads[0].video,
        name: 'upload.mp4',
      });

      try {
        const response = await axios.post(
          ENDPOINT_CAST,
          data,

          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

      // const res = await axios.post(
      //   ENDPOINT_CAST,
      //   {
      //     text: 'test text',
      //   },
      //   {
      //     headers: {Authorization: `Bearer ${authContext.state.token}`},
      //   },
      // );
      setPublishStatus('success');
    } catch (error) {
      console.error(error);
      setPublishStatus('error');
    }
  }, [authContext.state.token, threads]);

  function onPublishPress() {
    // publish();
  }

  return (
    <View style={{flex: 1}}>
      {/* <Text>Selected index: {currentThreadIndex}</Text> */}
      <FlatList
        style={styles.threadsCtn}
        data={threads}
        ListHeaderComponent={
          <View style={{marginBottom: 20}}>
            <ChannelButton
              channel={selectedChannel}
              onPress={() => {
                bottomSheetRef.current?.snapToIndex(0);
              }}
            />
          </View>
        }
        renderItem={({item, index}) => (
          <ThreadItem
            key={item.id}
            active={index === currentThreadIndex}
            textInputRef={index === currentThreadIndex ? inputRef : undefined}
            thread={item}
            maxLength={inputLimit}
            onFocus={() => setCurrentThreadIndex(index)}
            onKeyPress={e => onKeyPress(e, index)}
            onChangeText={newText => onThreadChangeText(newText, index)}
            onAddMediaPress={() => {
              onAddMediaPress(index);
            }}
            onCancelMediaPress={mediaIndex => {
              onCancelMediaPress(index, mediaIndex);
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        ListFooterComponent={
          <MyButtonNew
            style="secondary"
            title="Add new cast"
            iconLeft={
              <PlusImg
                width={14}
                height={14}
                color={MyTheme.white}
                style={{marginRight: 5}}
              />
            }
            customStyle={{alignSelf: 'center', marginBottom: 60, marginTop: 20}}
            onPress={onAddThreadPress}
          />
        }
      />
      <BottomSheet
        snapPoints={['80%']}
        index={-1}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        ref={bottomSheetRef}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeaderCtn}>
            <Text style={styles.bottomSheetHeaderText}>Choose a channel</Text>
            <MySearchField
              value={searchText}
              dismissKeyboardOnCancel
              onCancelPress={() => {
                setSearchText('');
              }}
              onChangeText={setSearchText}
            />
          </View>
          {allChannelsFetchStatus === 'success' ? (
            <>
              {allChannels.length > 0 ? (
                <View style={styles.channelsCtn}>{renderedChannelChips}</View>
              ) : (
                <View style={styles.infoCtn}>
                  <Text style={styles.infoText}>No channels</Text>
                </View>
              )}
            </>
          ) : allChannelsFetchStatus === 'loading' ? (
            <View
              style={{
                width: '100%',
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyLoader />
            </View>
          ) : allChannelsFetchStatus === 'error' ? (
            <View
              style={{
                width: '100%',
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>Error while fetching items</Text>
              <MyButton
                customStyle={{marginTop: 20}}
                title="Retry"
                width={'auto'}
                onPress={() => {
                  handleSearchChannel();
                }}
              />
            </View>
          ) : (
            <>
              <View>
                <Text style={styles.bottomSheetSubHeaderText}>RECENT</Text>
                <View style={styles.channelsCtn}>{renderedRecentChips}</View>
              </View>
            </>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  threadsCtn: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sectionItemHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  sectionItemImg: {width: 30, height: 30, borderRadius: 3},
  sectionItemHorizontalText: {
    fontFamily: MyTheme.fontRegular,
    flex: 1,
    fontSize: 13,
    marginLeft: 5,
    color: MyTheme.black,
  },
  bottomSheetContent: {},
  bottomSheetHeaderCtn: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
  },
  bottomSheetHeaderText: {
    color: MyTheme.black,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: MyTheme.fontRegular,
  },
  bottomSheetSubHeaderText: {
    color: MyTheme.grey400,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontFamily: MyTheme.fontSemiBold,
  },
  channelsCtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  channelChip: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  channelChipImg: {
    width: 20,
    height: 20,
    borderRadius: 3,
    marginRight: 5,
  },
  infoCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  infoText: {
    fontFamily: MyTheme.fontRegular,
    color: MyTheme.grey300,
  },
});

export default CreateThreadScreen;

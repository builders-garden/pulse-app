import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import axios, {CancelToken, CancelTokenSource} from 'axios';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {
  UploadCastBody,
  UploadCastResult,
  UploadEmbedResult,
  UploadMediaBody,
} from '../../api/cast/types';
import {
  Channel,
  ChannelsResponse,
  MostRecentChannelsResponse,
} from '../../api/channel/types';
import {RequestStatus} from '../../api/types';
import DiagonalArrowImg from '../../assets/images/icons/diagonal_arrow.svg';
import ListImg from '../../assets/images/icons/list.svg';
import PlusImg from '../../assets/images/icons/plus.svg';
import RecentImg from '../../assets/images/icons/recent.svg';
import BottomSheetKeyboardAwareScrollView from '../../components/BottomSheetKeyboardAwareScrollView';
import MentionsBox from '../../components/MentionsBox';
import MyChipBase from '../../components/MyChipBase';
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
const inputLimit = 1024;

function CreateThreadScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateThread'>) {
  const authContext = useContext(AuthContext);
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(
    route.params.channel ? route.params.channel : undefined,
  );
  const [mentionsPrompt, setMentionsPrompt] = useState('');
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [publishStatus, setPublishStatus] = useState<RequestStatus>('idle');
  const [, setUploadMediaStatus] = useState<RequestStatus>('idle');
  const [, setUploadCastStatus] = useState<RequestStatus>('idle');
  const [searchText, setSearchText] = useState('');
  const [allChannels, setAllChannels] = useState<Channel[]>([]);
  const [searchedChannels, setSearchedChannels] = useState<Channel[]>([]);
  const [recentChannels, setRecentChannels] = useState<Channel[]>([]);
  const [, setRecentChannelsFetchStatus] = useState<RequestStatus>('idle');
  const [, setAllChannelsFetchStatus] = useState<RequestStatus>('idle');
  const [searchChannelsFetchStatus, setSearchChannelsFetchStatus] =
    useState<RequestStatus>('idle');
  const [channelSearchIsDirty, setChannelSearchIsDirty] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [searchCancelToken, setSearchCancelToken] =
    useState<CancelTokenSource>();
  const [threads, setThreads] = useState<Thread[]>([
    {id: uuid.v4().toString(), body: '', images: [], links: []},
  ]);
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);
  const inputRef = createRef<TextInput>();
  const bottomSheetRef = createRef<BottomSheet>();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  const renderedSearchedChannelChips = useMemo(
    () =>
      searchedChannels.map((item: Channel) => {
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
    [searchedChannels, bottomSheetRef],
  );
  const renderedAllChannelChips = useMemo(
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

  const threadIsValid = useMemo(() => {
    return threads.findIndex(thread => thread.body.length === 0) === -1;
  }, [threads]);

  const handleSearchChannel = useCallback(
    async (cancelToken: CancelToken | undefined = undefined) => {
      if (authContext.state?.fid) {
        setSearchChannelsFetchStatus('loading');
        try {
          const finalUrl =
            ENDPOINT_CHANNELS + '?limit=10&idOrName=' + searchText;
          // console.log('searching profiles', finalUrl);
          const res = await axios.get<ChannelsResponse>(finalUrl, {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
            cancelToken: cancelToken,
          });
          // console.log('got response', res.data.result);
          // console.log('got response');
          setSearchedChannels(res.data.result.channels.slice(0, 50));
          if (!channelSearchIsDirty) {
            setChannelSearchIsDirty(true);
          }
          setSearchChannelsFetchStatus('success');
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error);
            setSearchChannelsFetchStatus('error');
          } else {
            console.log('cancelled channel search');
          }
        }
      }
    },
    [authContext, searchText],
  );

  const handleSearch = useCallback(() => {
    if (searchText.length > 0) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      if (searchCancelToken) {
        searchCancelToken.cancel();
      }

      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        handleSearchChannel(source.token);
      }, 500);
      setSearchTimeout(timeout);
      setSearchCancelToken(source);
      return () => {
        console.log('cancelling request');
        clearTimeout(timeout);
        source.cancel();
        if (searchTimeout) {
          clearTimeout(searchTimeout);
          setSearchTimeout(undefined);
        }
        if (searchCancelToken) {
          searchCancelToken.cancel();
          setSearchCancelToken(undefined);
        }
      };
    } else {
      setSearchedChannels([]);
      setChannelSearchIsDirty(false);
      setSearchChannelsFetchStatus('idle');
      if (searchTimeout) {
        clearTimeout(searchTimeout);
        setSearchTimeout(undefined);
      }
      if (searchCancelToken) {
        searchCancelToken.cancel();
        setSearchCancelToken(undefined);
      }
    }
  }, [searchText, handleSearchChannel]);

  const fetchRecentChannels = useCallback(async () => {
    // console.log('fetching recents');
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
    async function fetchAllChannels() {
      if (authContext.state?.fid) {
        setAllChannelsFetchStatus('loading');
        try {
          const finalUrl = ENDPOINT_CHANNELS + '?limit=30';
          const res = await axios.get<ChannelsResponse>(finalUrl, {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          });
          // console.log('got response');
          setAllChannels(res.data.result.channels.slice(0, 50));
          setAllChannelsFetchStatus('success');
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error);
            setAllChannelsFetchStatus('error');
          } else {
            console.log('cancelled channel search');
          }
        }
      }
    }

    fetchAllChannels();
  }, []);

  // useEffect(() => {
  //   console.log('change ref');
  //   if (inputRef.current !== null) {
  //     inputRef.current?.focus();
  //   }
  // }, [inputRef?.current]);

  async function onAddMediaPress(threadIndex: number) {
    if (
      threads[threadIndex].images.length < maxImagesCount &&
      !threads[threadIndex].video
    ) {
      let mediaType: MediaType = 'photo';
      // if (threads[threadIndex].images.length > 0) {
      //   mediaType = 'photo';
      // }
      const res = await launchImageLibrary({
        mediaType: mediaType,
        selectionLimit: 1,
        includeBase64: true,
      });
      // console.log(res);
      if (!res.didCancel) {
        const isVideo = res.assets?.[0]?.type?.startsWith('video');
        const media = res.assets?.[0];
        if (media !== undefined && media !== null) {
          const newThreads = [...threads];
          if (isVideo) {
            newThreads[threadIndex] = {
              ...newThreads[threadIndex],
              video: media,
            };
          } else {
            newThreads[threadIndex] = {
              ...newThreads[threadIndex],
              images: [...newThreads[threadIndex].images, media],
            };
          }
          setThreads(newThreads);
        }
      }
    } else {
      Toast.show({
        type: 'info',
        text1: "You can't upload more than 2 images!",
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

  function onThreadAddMention(mention: string) {
    console.log('onThreadAddMention:', mention);
    let newThreads = [...threads];
    let newBody = newThreads[currentThreadIndex].body;
    let slicedTextLeft = newBody.slice(0, selectionIndex);
    const slicedTextRight = newBody.slice(selectionIndex);
    const lines = slicedTextLeft.split('\n');
    const lastLine = lines[lines.length - 1];
    const splitLastLine = lastLine.split(' ');
    splitLastLine[splitLastLine.length - 1] = mention;
    lines[lines.length - 1] = splitLastLine.join(' ');
    slicedTextLeft = lines.join('\n') + ' ';
    newBody = slicedTextLeft + slicedTextRight;
    newThreads[currentThreadIndex] = {
      ...newThreads[currentThreadIndex],
      body: newBody,
    };
    setThreads(newThreads);
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

  function onSelectionChange(selection: {start: number; end: number}) {
    if (selection.start === selection.end) {
      const slicedText = threads[currentThreadIndex].body.slice(
        0,
        selection.start,
      );
      const split = slicedText.split(/\s*\r?\n\s*/);
      const lastWord = split[split.length - 1];

      if (
        (lastWord.startsWith('@') || lastWord.startsWith('/')) &&
        !lastWord.includes(' ')
      ) {
        if (mentionsPrompt !== lastWord) {
          setMentionsPrompt(lastWord);
        }
      } else {
        setMentionsPrompt('');
      }
      setSelectionIndex(selection.start);
    }
  }

  const uploadMedia = useCallback(
    async (mediaBody: UploadMediaBody) => {
      setUploadMediaStatus('loading');
      // route.params.channelId
      try {
        // console.log('mediaBody', mediaBody);
        const data = new FormData();
        mediaBody.forEach(item => {
          data.append('embeds', item);
        });
        // console.log('uploading media...', data);
        const finalUrl = ENDPOINT_CAST + '/upload-embeds';
        const response = await axios.post<UploadEmbedResult>(finalUrl, data, {
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        // console.log(response.data);

        setUploadMediaStatus('success');
        return {err: false, data: response.data.result};
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error uploading media',
        });
        setUploadMediaStatus('error');
        return {err: true, msg: error};
      }
    },
    [authContext.state.token],
  );

  const uploadCast = useCallback(
    async (castBody: UploadCastBody) => {
      setUploadCastStatus('loading');
      // route.params.channelId
      // console.log('publishing thread...');
      try {
        // console.log('body', castBody);
        const response = await axios.post<UploadCastResult>(
          ENDPOINT_CAST,
          castBody,
          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        // console.log(response.data);
        setUploadCastStatus('success');
        return {
          err: false,
          data: response.data.result,
        };
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error uploading cast',
        });
        console.error(error);
        setUploadCastStatus('error');
        return {err: true, msg: error};
      }
    },
    [authContext.state.token],
  );

  const publish = useCallback(async () => {
    setPublishStatus('loading');
    let currentParent = '';
    for (let i = 0; i < threads.length; i++) {
      // console.log('publishing thread no.', i);
      const thread = threads[i];
      let media: {
        url: string;
      }[] = [];
      if (thread.images.length > 0) {
        const mediaBody: UploadMediaBody = threads[i].images.map(item => {
          return {
            uri: item.uri || '',
            name: item.fileName || '',
            type: item.type || '',
          };
        });
        const uploadMediaRes = await uploadMedia(mediaBody);
        if (uploadMediaRes.err) {
          Toast.show({
            type: 'error',
            text1:
              'It was not possible to upload your media. Please contact support',
          });
          setPublishStatus('error');
          return;
        } else if (uploadMediaRes.data) {
          media = uploadMediaRes.data.map(item => ({url: item.url}));
        }
      }
      const body: UploadCastBody = {
        text: threads[i].body,
        embeds: media,
      };
      if (selectedChannel) {
        body.channelId = selectedChannel.id;
      }
      if (currentParent !== '') {
        body.parent = currentParent;
        body.parentAuthorFid = Number(authContext.state.fid);
      }
      const uploadCastRes = await uploadCast(body);
      if (uploadCastRes.err) {
        Toast.show({
          type: 'error',
          text1: 'It was not possible to upload the full thread',
        });
        setPublishStatus('error');
        return;
      } else {
        currentParent = uploadCastRes.data?.hash ?? '';
      }
    }
    setPublishStatus('success');
    Toast.show({
      type: 'success',
      text1: 'Thread published!',
    });
    navigation.goBack();
  }, [
    threads,
    selectedChannel,
    navigation,
    authContext,
    uploadMedia,
    uploadCast,
  ]);

  const renderHeaderRight = useCallback(
    () => (
      <MyButtonNew
        style="primary"
        disabled={!threadIsValid || publishStatus === 'loading'}
        loading={publishStatus === 'loading'}
        iconRight={<DiagonalArrowImg style={{marginLeft: 3}} />}
        onPress={() => {
          publish();
        }}
        title="Publish"
      />
    ),
    [threadIsValid, publishStatus, publish],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        renderScrollComponent={props => <KeyboardAwareScrollView {...props} />}
        style={styles.threadsCtn}
        showsVerticalScrollIndicator={false}
        data={threads}
        ListHeaderComponent={
          <View style={{marginBottom: 20, paddingHorizontal: 20}}>
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
            onChangeText={newText => {
              console.log('newText', newText);
              onThreadChangeText(newText, index);
            }}
            onAddMediaPress={() => {
              onAddMediaPress(index);
            }}
            onCancelMediaPress={mediaIndex => {
              onCancelMediaPress(index, mediaIndex);
            }}
            onSelectionChange={onSelectionChange}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        ListFooterComponent={
          <MyButtonNew
            style="primary"
            filling="outline"
            title="Add new cast"
            iconLeft={
              <PlusImg
                width={14}
                height={14}
                color={MyTheme.primaryColor}
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
        ref={bottomSheetRef}>
        <BottomSheetKeyboardAwareScrollView style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeaderCtn}>
            <Text style={styles.bottomSheetHeaderText}>Choose a channel</Text>
            <MySearchField
              value={searchText}
              dismissKeyboardOnCancel
              loading={searchChannelsFetchStatus === 'loading'}
              onCancelPress={() => {
                setSearchText('');
                setChannelSearchIsDirty(false);
              }}
              onChangeText={setSearchText}
            />
          </View>
          {searchChannelsFetchStatus === 'error' ? (
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
          ) : channelSearchIsDirty ? (
            <>
              {searchedChannels.length > 0 ? (
                <View style={styles.channelsCtn}>
                  {renderedSearchedChannelChips}
                </View>
              ) : (
                <View style={styles.infoCtn}>
                  <Text style={styles.infoText}>No channels</Text>
                </View>
              )}
            </>
          ) : (
            <>
              <View>
                <View style={styles.bottomSheetSubHeader}>
                  <RecentImg width={20} height={20} />
                  <Text style={styles.bottomSheetSubHeaderText}>RECENT</Text>
                </View>
                <View style={styles.channelsCtn}>{renderedRecentChips}</View>
              </View>
              <View>
                <View style={styles.bottomSheetSubHeader}>
                  <ListImg width={20} height={20} />
                  <Text style={styles.bottomSheetSubHeaderText}>
                    ALL CHANNELS
                  </Text>
                </View>
                <View style={styles.channelsCtn}>
                  {renderedAllChannelChips}
                </View>
              </View>
            </>
          )}
        </BottomSheetKeyboardAwareScrollView>
      </BottomSheet>
      <MentionsBox prompt={mentionsPrompt} onItemPress={onThreadAddMention} />
    </View>
  );
}

const styles = StyleSheet.create({
  threadsCtn: {
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
  bottomSheetSubHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  bottomSheetSubHeaderText: {
    color: MyTheme.grey400,
    marginLeft: 6,
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

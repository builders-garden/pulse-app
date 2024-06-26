import axios from 'axios';
import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
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
import {RequestStatus} from '../../api/types';
import DiagonalArrowImg from '../../assets/images/icons/diagonal_arrow.svg';
import MentionsBox from '../../components/MentionsBox';
import MyButtonNew from '../../components/buttons/MyButtonNew';
import ThreadItem from '../../components/threadItem/ThreadItem';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {useKeyboard} from '../../hooks/useKeyboard';
import {RootStackScreenProps} from '../../routing/types';
import {MyTheme} from '../../theme';
import {Thread} from '../../types';
import {ENDPOINT_CAST} from '../../variables';
import CastBox from './components/CastBox';
const maxImagesCount = 2;
const inputLimit = 1024;

function CreateCommentScreen({
  navigation,
  route,
}: RootStackScreenProps<'CreateComment'>) {
  const authContext = useContext(AuthContext);
  const keyboard = useKeyboard();
  const [publishStatus, setPublishStatus] = useState<RequestStatus>('idle');
  const [, setUploadMediaStatus] = useState<RequestStatus>('idle');
  const [, setUploadCastStatus] = useState<RequestStatus>('idle');
  const [comment, setComment] = useState<Thread>({
    id: uuid.v4().toString(),
    body: '',
    images: [],
    links: [],
  });
  const [mentionsPrompt, setMentionsPrompt] = useState('');
  const [selectionIndex, setSelectionIndex] = useState(0);
  const inputRef = createRef<TextInput>();

  const commentIsValid = useMemo(() => {
    return comment.body.length > 0;
  }, [comment]);

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
      // console.log('publishing comment...');
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
    // console.log('publishing comment');
    let media: {
      url: string;
    }[] = [];
    if (comment.images.length > 0) {
      const mediaBody: UploadMediaBody = comment.images.map(item => {
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
          text1: 'It was not possible to upload your media',
        });
        setPublishStatus('error');
        return;
      } else if (uploadMediaRes.data) {
        media = uploadMediaRes.data.map(item => ({url: item.url}));
      }
    }
    const body: UploadCastBody = {
      text: comment.body,
      embeds: media,
    };
    body.parent = route.params.cast.hash;
    body.parentAuthorFid = route.params.cast.author.fid;
    const uploadCastRes = await uploadCast(body);
    if (uploadCastRes.err) {
      Toast.show({
        type: 'error',
        text1: 'It was not possible to upload the full comment',
      });
      setPublishStatus('error');
      return;
    }
    setPublishStatus('success');
    Toast.show({
      type: 'success',
      text1: 'Comment published!',
    });
    navigation.goBack();
  }, [
    comment,
    navigation,
    uploadMedia,
    uploadCast,
    route.params.cast.hash,
    route.params.cast.author.fid,
  ]);

  const renderHeaderRight = useCallback(
    () => (
      <MyButtonNew
        style="primary"
        disabled={!commentIsValid || publishStatus === 'loading'}
        loading={publishStatus === 'loading'}
        iconRight={<DiagonalArrowImg style={{marginLeft: 3}} />}
        onPress={() => {
          publish();
        }}
        title="Send"
      />
    ),
    [publishStatus, commentIsValid, publish],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  async function onAddMediaPress() {
    if (comment.images.length < maxImagesCount && !comment.video) {
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
          const newComment = {...comment};
          if (isVideo) {
            newComment.video = media;
          } else {
            newComment.images = [...newComment.images, media];
          }
          setComment(newComment);
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
  async function onCancelMediaPress(mediaIndex: number) {
    const newThread = {...comment};
    if (newThread.video) {
      delete newThread.video;
    } else {
      newThread.images = newThread.images.filter((el, i) => i !== mediaIndex);
    }
    setComment(newThread);
  }

  function onThreadChangeText(newText: string) {
    const newThread = {...comment};
    newThread.body = newText;
    setComment(newThread);
  }

  function onThreadAddMention(mention: string) {
    console.log('onThreadAddMention:', mention);
    let newComment = {...comment};
    let newBody = newComment.body;
    let slicedTextLeft = newBody.slice(0, selectionIndex);
    const slicedTextRight = newBody.slice(selectionIndex);
    const lines = slicedTextLeft.split('\n');
    const lastLine = lines[lines.length - 1];
    const splitLastLine = lastLine.split(' ');
    splitLastLine[splitLastLine.length - 1] = mention;
    lines[lines.length - 1] = splitLastLine.join(' ');
    slicedTextLeft = lines.join('\n') + ' ';
    newBody = slicedTextLeft + slicedTextRight;
    newComment = {
      ...newComment,
      body: newBody,
    };
    setComment(newComment);
  }

  function onKeyPress() {
    if (comment.body.length === inputLimit) {
      Toast.show({
        type: 'info',
        text1: 'Input limit reached!',
        text2: 'Please create another comment to continue.',
        topOffset: 50,
      });
    }
  }

  function onSelectionChange(selection: {start: number; end: number}) {
    if (selection.start === selection.end) {
      const slicedText = comment.body.slice(0, selection.start);
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <KeyboardAwareScrollView style={styles.threadCtn}>
        <CastBox cast={route.params.cast} customStyle={{marginBottom: 15}} />
        <ThreadItem
          active={true}
          textInputRef={inputRef}
          thread={comment}
          maxLength={inputLimit}
          onKeyPress={() => onKeyPress()}
          onChangeText={newText => onThreadChangeText(newText)}
          onAddMediaPress={() => {
            onAddMediaPress();
          }}
          onCancelMediaPress={mediaIndex => {
            onCancelMediaPress(mediaIndex);
          }}
          onSelectionChange={onSelectionChange}
        />
        <View style={{height: keyboard ? 40 : 60}} />
      </KeyboardAwareScrollView>
      <MentionsBox prompt={mentionsPrompt} onItemPress={onThreadAddMention} />
    </View>
  );
}

const styles = StyleSheet.create({
  threadCtn: {
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
});

export default CreateCommentScreen;

import axios, {CancelToken, CancelTokenSource} from 'axios';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import {ChannelsResponse} from '../api/channel/types';
import {ProfileSearchResponse} from '../api/profile/types';
import {RequestStatus} from '../api/types';
import {AuthContext} from '../contexts/auth/Auth.context';
import {useKeyboard} from '../hooks/useKeyboard';
import {channel2Mention, profile2Mention} from '../libs/mentions';
import {MyTheme} from '../theme';
import {Mention} from '../types';
import {ENDPOINT_CHANNELS, ENDPOINT_PROFILE} from '../variables';
import MyChipBase from './MyChipBase';

interface MentionsBoxProps {
  prompt: string;
  onItemPress: (mentionId: string) => void;
}

const MentionsBox = ({
  prompt,
  onItemPress,
}: PropsWithChildren<MentionsBoxProps>) => {
  const authContext = useContext(AuthContext);
  const keyboard = useKeyboard();
  const [searchedItems, setSearchedItems] = useState<Mention[]>([]);
  const [, setSearchMentionsFetchStatus] = useState<RequestStatus>('idle');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [searchCancelToken, setSearchCancelToken] =
    useState<CancelTokenSource>();

  const isUserMention = useMemo(() => prompt.startsWith('@'), [prompt]);

  const handleSearchMentions = useCallback(
    async (cancelToken: CancelToken | undefined = undefined) => {
      if (authContext.state?.fid) {
        setSearchMentionsFetchStatus('loading');
        try {
          console.log('searching 3');
          let resMentions;
          if (isUserMention) {
            console.log('searching profiles', prompt);
            const finalUrl = ENDPOINT_PROFILE + '?q=' + prompt.slice(1);
            // console.log('searching profiles', finalUrl);
            const res = await axios.get<ProfileSearchResponse>(finalUrl, {
              headers: {Authorization: `Bearer ${authContext.state.token}`},
              cancelToken: cancelToken,
            });
            resMentions = res.data.result.slice(0, 10).map(profile2Mention);
          } else {
            const finalUrl =
              ENDPOINT_CHANNELS + '?limit=10&idOrName=' + prompt.slice(1);
            // console.log('searching profiles', finalUrl);
            const res = await axios.get<ChannelsResponse>(finalUrl, {
              headers: {Authorization: `Bearer ${authContext.state.token}`},
              cancelToken: cancelToken,
            });
            resMentions = res.data.result.channels
              .slice(0, 10)
              .map(channel2Mention);
          }
          console.log('searching 4', resMentions);
          setSearchedItems(resMentions);
          // console.log('got response', res.data.result);
          // console.log('got response');
          // setSearchedChannels(res.data.result.channels.slice(0, 10));
          setSearchMentionsFetchStatus('success');
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error(error);
            setSearchMentionsFetchStatus('error');
          } else {
            console.log('cancelled channel search');
          }
        }
      }
    },
    [authContext, prompt, isUserMention],
  );

  const handleSearch = useCallback(() => {
    if (prompt.length > 1) {
      console.log('searching');
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      if (searchCancelToken) {
        searchCancelToken.cancel();
      }

      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        console.log('searching 2');
        handleSearchMentions(source.token);
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
      setSearchedItems([]);
      setSearchMentionsFetchStatus('idle');
      if (searchTimeout) {
        clearTimeout(searchTimeout);
        setSearchTimeout(undefined);
      }
      if (searchCancelToken) {
        searchCancelToken.cancel();
        setSearchCancelToken(undefined);
      }
    }
  }, [prompt, handleSearchMentions]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // const renderItem = useCallback(
  //   ({item}: {item: Mention}) => (
  //     <MyChipBase
  //       key={item.id}
  //       title={`${item.prefix}${item.id}`}
  //       size="small"
  //       iconLeft={
  //         <FastImage
  //           style={styles.channelChipImg}
  //           source={{uri: item.imageUrl}}
  //         />
  //       }
  //       style="primary"
  //       customStyle={styles.channelChip}
  //       textCustomStyle={{color: MyTheme.grey500}}
  //       onPress={() => {
  //         console.log('item pressed', item.id);
  //       }}
  //     />
  //   ),
  //   [onItemPress],
  // );

  const itemsHtml = useMemo(
    () =>
      searchedItems.map(item => (
        <MyChipBase
          key={item.id}
          title={`${item.prefix}${item.id}`}
          size="small"
          iconLeft={
            <FastImage
              style={styles.channelChipImg}
              source={{uri: item.imageUrl}}
            />
          }
          style="tertiary"
          customStyle={styles.channelChip}
          textCustomStyle={{color: MyTheme.grey500}}
          onPress={() => {
            console.log('item pressed', item.id);
            onItemPress(`${item.prefix}${item.id}`);
          }}
        />
      )),
    [searchedItems, onItemPress],
  );

  return (
    <>
      {keyboard ? (
        <KeyboardStickyView>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            horizontal
            style={styles.root}>
            {itemsHtml}
          </ScrollView>
          {/* <FlatList
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              horizontal
              data={searchedItems}
              renderItem={renderItem}
              style={styles.root}
            /> */}
        </KeyboardStickyView>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  channelChip: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 5,
    elevation: 10,
    zIndex: 10,
  },
  channelChipImg: {
    width: 20,
    height: 20,
    borderRadius: 3,
    marginRight: 5,
  },
});

export default MentionsBox;

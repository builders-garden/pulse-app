import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import React, {createRef, useCallback, useEffect, useMemo} from 'react';
import {Share, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Channel} from '../../api/channel/types';
import {Profile} from '../../api/profile/types';
import LinkImg from '../../assets/images/icons/link.svg';
import MintImg from '../../assets/images/icons/mint.svg';
import ScoreImg from '../../assets/images/icons/score.svg';
import ShareImg from '../../assets/images/icons/share.svg';
import {MyTheme} from '../../theme';
import MyButtonNew from '../buttons/MyButtonNew';
import DownCard from './DownCard';
import UpCard from './UpCard';

interface OptionsBottomSheetProps {
  hash: string;
  analytics?: {
    author: Profile;
    channel?: Channel;
    upvotes: number;
    recasts: number;
    replies: number;
  };
  showMint?: boolean;
  onInteract?: () => void;
}

function OptionsBottomSheet({
  hash,
  analytics,
  showMint,
  onInteract,
}: OptionsBottomSheetProps) {
  const bottomSheetRef = createRef<BottomSheet>();
  const navigation = useNavigation();
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  useEffect(() => {
    if (bottomSheetRef.current !== null) {
      if (hash !== '') {
        console.log('hash', hash);
        bottomSheetRef.current?.snapToIndex(0);
      } else {
        bottomSheetRef.current?.close();
      }
    }
  }, [hash, bottomSheetRef]);

  const snapPoints = useMemo(
    () => [(analytics ? 350 : 120) + (showMint ? 50 : 0)],
    [analytics, showMint],
  );

  return (
    <BottomSheet
      backgroundStyle={
        analytics
          ? {backgroundColor: MyTheme.grey100}
          : {
              backgroundColor: MyTheme.white,
            }
      }
      handleStyle={styles.handle}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      onClose={() => {
        console.log('closing');
      }}
      enablePanDownToClose>
      <BottomSheetView>
        <View style={styles.buttonsCtn}>
          <MyButtonNew
            title="Share"
            onPress={() => {
              Share.share({
                url: `stringz://thread-detail/${hash}`,
              });
            }}
            style="quaternary"
            iconLeft={
              <ShareImg
                height={16}
                width={16}
                color={MyTheme.grey500}
                style={{marginRight: 3}}
              />
            }
            customStyle={styles.button}
            textCustomStyle={{color: MyTheme.grey500}}
          />
          <MyButtonNew
            customStyle={styles.button}
            title="Copy link"
            onPress={() => {
              Clipboard.setString(`stringz://thread-detail/${hash}`);
              Toast.show({
                type: 'success',
                text1: 'Link copied',
                visibilityTime: 1000,
              });
            }}
            style="quaternary"
            textCustomStyle={{color: MyTheme.grey500}}
            iconLeft={
              <LinkImg
                height={18}
                width={18}
                color={MyTheme.grey500}
                style={{marginRight: 3}}
              />
            }
          />
          {showMint && (
            <MyButtonNew
              customStyle={styles.mintButton}
              title="Mint thread"
              onPress={() => {}}
              style="quaternary"
              textCustomStyle={{color: MyTheme.grey500}}
              iconLeft={
                <MintImg
                  height={18}
                  width={18}
                  color={MyTheme.grey500}
                  style={{marginRight: 3}}
                />
              }
              iconRight={
                <View
                  style={{
                    backgroundColor: MyTheme.primaryColor,
                    paddingHorizontal: 4,
                    paddingVertical: 1,
                    borderRadius: 2,
                    marginLeft: 'auto',
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontFamily: MyTheme.fontBold,
                      color: MyTheme.white,
                      fontSize: 12,
                    }}>
                    SOON
                  </Text>
                </View>
                // <Text style={{color: MyTheme.grey500}}>Coming soon</Text>
              }
            />
          )}
        </View>
        {analytics && (
          <View style={styles.analyticsCtn}>
            <View style={styles.analyticsHeader}>
              <ScoreImg width={20} height={20} />
              <Text style={styles.analyticsHeaderText}>ANALYTICS</Text>
            </View>
            <View style={styles.upSectionCtn}>
              <UpCard
                imageUrl={analytics?.author.pfp_url ?? ''}
                title={analytics?.author.display_name ?? ''}
                subtitle={`@${analytics?.author.username}`}
                onPress={() => {
                  navigation.push('Profile', {
                    userFid: analytics?.author.fid.toString(),
                  });
                  onInteract && onInteract();
                }}
              />
              {analytics?.channel && (
                <UpCard
                  imageUrl={analytics?.channel.image_url ?? ''}
                  title={analytics?.channel.name ?? ''}
                  subtitle={`/${analytics?.channel.id}`}
                  onPress={() => {
                    navigation.push('Channel', {
                      channelId: analytics?.channel?.id ?? '',
                    });
                    onInteract && onInteract();
                  }}
                />
              )}
            </View>
            <View style={styles.downSectionCtn}>
              <DownCard
                title={analytics?.upvotes.toString() ?? ''}
                subtitle="Upvotes"
              />
              <DownCard
                title={analytics?.recasts.toString() ?? ''}
                subtitle="Recasts"
              />
              <DownCard
                title={analytics?.replies.toString() ?? ''}
                subtitle="Replies"
              />
            </View>
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handle: {
    backgroundColor: MyTheme.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  buttonsCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
    backgroundColor: MyTheme.white,
  },
  analyticsCtn: {
    paddingTop: 22,
    paddingHorizontal: 22,
    borderTopWidth: 1,
    borderTopColor: MyTheme.greyTransparent,
  },
  analyticsHeader: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  analyticsHeaderText: {
    color: MyTheme.grey400,
    marginLeft: 6,
    fontFamily: MyTheme.fontSemiBold,
  },
  upSectionCtn: {
    flexDirection: 'row',
    gap: 10,
  },
  downSectionCtn: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {flex: 1, borderRadius: 3, height: 44, justifyContent: 'flex-start'},
  mintButton: {
    width: '100%',
    paddingRight: 6,
    borderRadius: 3,
    height: 44,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default OptionsBottomSheet;

import axios from 'axios';
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import Toast from 'react-native-toast-message';
import {ProfileFollowResponse} from '../../api/profile/types';
import {AuthContext} from '../../contexts/auth/Auth.context';
import {MyTheme} from '../../theme';
import {ENDPOINT_PROFILE} from '../../variables';
import MyButtonNew from './MyButtonNew';

interface VariantMapItem {
  followingStyle: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  notFollowingStyle: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  followingFill: 'solid' | 'outline' | 'clear';
  notFollowingFill: 'solid' | 'outline' | 'clear';
}

export interface FollowButtonProps {
  fid: number;
  followingInitialValue: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  textCustomStyle?: StyleProp<TextStyle>;
}

const FollowButton = ({
  fid,
  followingInitialValue,
  variant = 'primary',
  size = 'medium',
  disabled,
  customStyle,
  textCustomStyle,
}: FollowButtonProps) => {
  const authContext = useContext(AuthContext);
  const [isFollow, setIsFollow] = useState(0);

  const isCurrentlyFollowing = useMemo(
    () => (isFollow === 0 ? followingInitialValue : isFollow === 1),
    [isFollow, followingInitialValue],
  );

  const toggleFollow = useCallback(async () => {
    try {
      if (isCurrentlyFollowing) {
        const finalUrl = `${ENDPOINT_PROFILE}/unfollow`;
        console.log('deleting', finalUrl, fid);
        const res = await axios.delete<ProfileFollowResponse>(finalUrl, {
          data: {
            fids: fid,
          },
          headers: {Authorization: `Bearer ${authContext.state.token}`},
        });
        console.log('got response', res.data);
        if (res.data.result.success) {
          if (isFollow === 1) {
            setIsFollow(0);
          } else if (isFollow === 0) {
            setIsFollow(-1);
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Could not unfollow user',
          });
        }
      } else {
        const finalUrl = `${ENDPOINT_PROFILE}/follow`;
        console.log('following', finalUrl);
        console.log('following', fid);
        const res = await axios.post<ProfileFollowResponse>(
          finalUrl,
          {
            fids: fid,
          },
          {
            headers: {Authorization: `Bearer ${authContext.state.token}`},
          },
        );
        console.log('got response', res.data);
        if (res.data.result.success) {
          if (isFollow === -1) {
            setIsFollow(0);
          } else if (isFollow === 0) {
            setIsFollow(1);
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Could not follow user',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [authContext.state.token, fid, isFollow, isCurrentlyFollowing]);

  return (
    <MyButtonNew
      title={isCurrentlyFollowing ? 'Unfollow' : 'Follow'}
      style={
        isCurrentlyFollowing
          ? variantMap[variant].followingStyle
          : variantMap[variant].notFollowingStyle
      }
      filling={
        isCurrentlyFollowing
          ? variantMap[variant].followingFill
          : variantMap[variant].notFollowingFill
      }
      size={size}
      disabled={disabled}
      customStyle={customStyle}
      textCustomStyle={[
        isCurrentlyFollowing && {color: MyTheme.grey600},
        textCustomStyle,
      ]}
      onPress={toggleFollow}
    />
  );
};

const variantMap: {
  [key: string]: VariantMapItem;
} = {
  primary: {
    followingStyle: 'secondary',
    notFollowingStyle: 'primary',
    followingFill: 'solid',
    notFollowingFill: 'solid',
  },
  secondary: {
    followingStyle: 'secondary',
    notFollowingStyle: 'quaternary',
    followingFill: 'outline',
    notFollowingFill: 'solid',
  },
};

export default FollowButton;

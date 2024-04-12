import React from 'react';
import {FlatList, View} from 'react-native';
import MyFloatingButton from '../../components/MyFloatingButton';
import MyPost from '../../components/post/MyPost';
import {HomeTabScreenProps} from '../../routing/types';

const placeholderPosts = [
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: '/degen',
    headerSubtitle: 'limone.eth - serial frame hacker • @limone.eth',
    content:
      'time to share what we built this weekend in london!fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- social login- pay your friends- send request links- create virtual cards- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    commentsCount: 3,
    quotesCount: 2,
    postTime: '2h',
  },
];

function FeedScreen({navigation}: HomeTabScreenProps<'Feed'>) {
  return (
    <View>
      <MyFloatingButton
        icon={require('../../assets/images/icons/feather.png')}
        onPress={() => {
          navigation.navigate('CreateThread');
        }}
      />
      <FlatList
        data={placeholderPosts}
        renderItem={({item}) => (
          <MyPost
            headerImg={item.headerImg}
            postTime={item.postTime}
            headerTitle={item.headerTitle}
            headerSubtitle={item.headerSubtitle}
            content={item.content}
            image={item.image ?? null}
            upvotesCount={item.upvotesCount}
            commentsCount={item.commentsCount}
            quotesCount={item.quotesCount}
            onContentBodyPress={() => {
              navigation.navigate('ThreadDetail', {
                threadId: 1,
              });
            }}
          />
        )}
      />
    </View>
  );
}

export default FeedScreen;

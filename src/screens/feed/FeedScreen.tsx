import React from 'react';
import {FlatList, View} from 'react-native';
import MyPost from '../../components/MyPost';

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

function FeedScreen() {
  return (
    <View>
      <FlatList
        data={placeholderPosts}
        renderItem={({item}) => (
          <MyPost
            headerImg={item.headerImg}
            postTime={item.postTime}
            headerTitle={item.headerTitle}
            headerSubtitle={item.headerSubtitle}
            content={item.content}
            // image={item.image}
            upvotesCount={item.upvotesCount}
            commentsCount={item.commentsCount}
            quotesCount={item.quotesCount}
          />
        )}
      />
    </View>
  );
}

export default FeedScreen;

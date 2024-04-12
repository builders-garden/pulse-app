import React from 'react';
import {FlatList, View} from 'react-native';
import MyComment from '../../components/comment/MyComment';
import MyPost from '../../components/post/MyPost';

const placeholderPost = {
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
};

const placeholderPosts = [
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 0,
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 1,
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 2,
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 2,
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    image: require('../../assets/images/placeholders/picture.png'),
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 3,
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 3,
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 4,
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 1,
  },
  {
    headerImg: require('../../assets/images/placeholders/profile_pic.png'),
    headerTitle: 'limone.eth - serial frame hacker',
    headerSubtitle: '@limone.eth',
    content:
      'Fluidpay, stealth p2p payments on @base with usdc thanks to @fluidkey and @safe smart accounts- connect your @gnosispaycc @frankk @orbulo',
    upvotesCount: 10,
    quotesCount: 2,
    postTime: '2h',
    indentLevel: 2,
  },
];

function ThreadDetailScreen() {
  return (
    <View>
      <FlatList
        data={placeholderPosts}
        ListHeaderComponent={
          <MyPost
            headerImg={placeholderPost.headerImg}
            postTime={placeholderPost.postTime}
            headerTitle={placeholderPost.headerTitle}
            headerSubtitle={placeholderPost.headerSubtitle}
            content={placeholderPost.content}
            image={placeholderPost.image ?? null}
            upvotesCount={placeholderPost.upvotesCount}
            commentsCount={placeholderPost.commentsCount}
            quotesCount={placeholderPost.quotesCount}
          />
        }
        renderItem={({item, index}) => (
          <MyComment
            headerImg={item.headerImg}
            postTime={item.postTime}
            headerTitle={item.headerTitle}
            headerSubtitle={item.headerSubtitle}
            indentLevel={item.indentLevel ?? 0}
            content={item.content}
            image={item?.image ?? null}
            upvotesCount={item.upvotesCount}
            quotesCount={item.quotesCount}
            commentCustomStyle={{
              paddingBottom:
                index < placeholderPosts.length - 1 &&
                placeholderPosts[index + 1].indentLevel >= item.indentLevel
                  ? 20
                  : 0,
              paddingTop:
                index > 0 &&
                placeholderPosts[index - 1].indentLevel > item.indentLevel
                  ? 20
                  : 0,
            }}
          />
        )}
      />
    </View>
  );
}

export default ThreadDetailScreen;

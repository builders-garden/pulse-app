import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import MyCard from '../../components/MyCard';
import {HomeTabScreenProps} from '../../routing/types';
import TrendingPostItem from './components/TrendingPostItem';

const placeholderCards = [
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur. Mauris tincidunt pellentesque sit vitae magna.',
    buttonText: 'Follow',
  },
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur.',
    buttonText: 'Follow',
  },
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur.',
    buttonText: 'Follow',
  },
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur. Mauris tincidunt pellentesque sit vitae magna.',
    buttonText: 'Follow',
  },
  {
    title: 'test title',
    subtitle: '66.4k followers',
    body: 'Lorem ipsum dolor sit amet consectetur. Mauris tincidunt pellentesque sit vitae magna.',
    buttonText: 'Follow',
  },
];

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

function DiscoverScreen({navigation}: HomeTabScreenProps<'Discover'>) {
  const transformedTopChannels = placeholderCards.reduce(
    (acc, curr, index, array) => {
      if (index % 2 === 0) {
        if (index === array.length - 1) {
          acc.push({item1: curr});
        } else {
          acc.push({item1: curr, item2: array[index + 1]});
        }
      }
      return acc;
    },
    [] as Array<{
      item1: (typeof placeholderCards)[0];
      item2?: (typeof placeholderCards)[0];
    }>,
  );

  return (
    <ScrollView style={styles.root}>
      <View>
        <Text style={styles.sectionLabel}>For you</Text>
        <FlatList
          horizontal
          data={placeholderCards}
          renderItem={({item, index}) => (
            <MyCard
              title={item.title}
              subtitle={item.subtitle}
              body={item.body}
              buttonText={item.buttonText}
              customStyle={{
                marginLeft: index == 0 ? 20 : 10,
                marginRight: index == placeholderCards.length - 1 ? 20 : 0,
              }}
              onPress={() => {}}
              onButtonPress={() => {}}
            />
          )}
        />
      </View>
      <View style={{marginTop: 30}}>
        <Text style={styles.sectionLabel}>Trending threads</Text>
        <FlatList
          horizontal
          data={placeholderPosts}
          renderItem={({item, index}) => (
            <TrendingPostItem
              channel="/degen"
              headerTitle={item.headerTitle}
              headerSubtitle={item.headerSubtitle}
              headerImg={item.headerImg}
              content={item.content}
              image={item.image}
              buttonText="Follow"
              upvotesCount={item.upvotesCount}
              commentsCount={item.commentsCount}
              quotesCount={item.quotesCount}
              postTime={item.postTime}
              customStyle={{
                marginLeft: index == 0 ? 20 : 10,
                marginRight: index == placeholderCards.length - 1 ? 20 : 0,
              }}
              onContentBodyPress={() => {}}
              onButtonPress={() => {}}
            />
          )}
        />
      </View>
      <View style={{marginTop: 30}}>
        <Text style={styles.sectionLabel}>Trending channels</Text>
        <FlatList
          horizontal
          data={placeholderCards}
          renderItem={({item, index}) => (
            <MyCard
              title={item.title}
              subtitle={item.subtitle}
              body={item.body}
              buttonText={item.buttonText}
              horizontal
              customStyle={{
                marginLeft: index == 0 ? 20 : 10,
                marginRight: index == placeholderCards.length - 1 ? 20 : 0,
              }}
              onPress={() => {}}
              onButtonPress={() => {}}
            />
          )}
        />
      </View>
      <View style={{marginTop: 30, marginBottom: 20}}>
        <Text style={styles.sectionLabel}>Top channels</Text>
        <FlatList
          horizontal
          data={transformedTopChannels}
          renderItem={({item, index}) => (
            <View
              style={{
                marginLeft: index == 0 ? 20 : 10,
                marginRight: index == placeholderCards.length - 1 ? 20 : 0,
              }}>
              <MyCard
                title={item.item1.title}
                subtitle={item.item1.subtitle}
                horizontal
                body={item.item1.body}
                buttonText={item.item1.buttonText}
                onPress={() => {}}
                customStyle={{
                  height: 120,
                }}
                onButtonPress={() => {}}
              />
              {item.item2 && (
                <MyCard
                  title={item.item2.title}
                  subtitle={item.item2.subtitle}
                  horizontal
                  body={item.item2.body}
                  buttonText={item.item2.buttonText}
                  customStyle={{
                    marginTop: 10,
                    height: 120,
                  }}
                  onPress={() => {}}
                  onButtonPress={() => {}}
                />
              )}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default DiscoverScreen;

import React from 'react';
import {FlatList} from 'react-native';
import {UserCast} from '../../../api/user/types';
import MyPost from '../../../components/post/MyPost';
import {TransformUserCast} from '../../../libs/post';

interface ThreadsSectionProps {
  threads: UserCast[];
}

function ThreadsSection({threads}: ThreadsSectionProps) {
  return (
    <FlatList
      data={threads}
      windowSize={5}
      renderItem={({item, index}) => {
        console.log('item', JSON.stringify(item, null, 2));
        const transformedItem = TransformUserCast(item);

        return (
          <MyPost
            headerImg={transformedItem.headerImg}
            postTime={transformedItem.postTime}
            headerTitle={transformedItem.headerTitle}
            headerSubtitle={transformedItem.headerSubtitle}
            content={transformedItem.content}
            image={transformedItem.image}
            upvotesCount={transformedItem.upvotesCount}
            commentsCount={transformedItem.commentsCount}
            quotesCount={transformedItem.quotesCount}
            customStyle={{
              marginBottom: 15,
              marginTop: index === 0 ? 15 : 0,
            }}
            onContentBodyPress={() => {
              // navigation.navigate('ThreadDetail', {
              //   threadHash: item.hash,
              // });
            }}
          />
        );
      }}
    />
  );
}

export default ThreadsSection;

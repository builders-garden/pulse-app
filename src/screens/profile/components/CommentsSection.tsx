import React from 'react';
import {FlatList} from 'react-native';
import {Comment} from '../../../api/cast/types';
import MyPost from '../../../components/post/MyPost';
import {TransformFeedItem} from '../../../libs/post';

interface CommentsSectionProps {
  comments: Comment[];
}

function CommentsSection({comments}: CommentsSectionProps) {
  return (
    <FlatList
      data={comments}
      windowSize={5}
      renderItem={({item, index}) => {
        const transformedItem = TransformFeedItem(item);

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

export default CommentsSection;

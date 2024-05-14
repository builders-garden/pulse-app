import React from 'react';
import {FlatList} from 'react-native';
import {Comment} from '../../../api/cast/types';
import {TransformFeedItem} from '../../../libs/post';
import CommentBox from './CommentBox';

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
          <CommentBox
            headerImg={transformedItem.headerImg}
            postTime={transformedItem.postTime}
            headerTitle={transformedItem.headerTitle}
            headerSubtitle={transformedItem.headerSubtitle}
            content={transformedItem.content}
            image={transformedItem.image}
            upvotesCount={transformedItem.upvotesCount}
            quotesCount={transformedItem.quotesCount}
          />
        );
      }}
    />
  );
}

export default CommentsSection;

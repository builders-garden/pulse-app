import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Comment} from '../../../api/cast/types';
import MyComment from '../../../components/comment/MyComment';
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
          <MyComment
            headerImg={transformedItem.headerImg}
            postTime={transformedItem.postTime}
            headerTitle={transformedItem.headerTitle}
            headerSubtitle={transformedItem.headerSubtitle}
            content={transformedItem.content}
            quote="test quote text"
            quoteTitle="@handle"
            image={transformedItem.image}
            upvotesCount={transformedItem.upvotesCount}
            quotesCount={transformedItem.quotesCount}
            rootCustomStyle={[
              styles.comment,
              {
                marginTop: index === 0 ? 15 : 0,
              },
            ]}
            hideActionBar
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  comment: {
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 4,
  },
});

export default CommentsSection;

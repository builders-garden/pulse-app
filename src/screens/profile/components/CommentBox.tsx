import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import MyComment, {MyCommentProps} from '../../../components/comment/MyComment';

type CommentBoxProps = Omit<
  Omit<Omit<MyCommentProps, 'indentLevel'>, 'commentCustomStyle'>,
  'rootCustomStyle'
> & {
  customStyle?: StyleProp<ViewStyle>;
};

function CommentBox({
  headerImg,
  postTime,
  headerTitle,
  headerSubtitle,
  quote,
  content,
  image,
  quotesCount,
  upvotesCount,
  customStyle,
}: CommentBoxProps) {
  return (
    <View style={[styles.root, customStyle && customStyle]}>
      <MyComment
        headerImg={headerImg}
        postTime={postTime}
        headerTitle={headerTitle}
        quote={quote}
        headerSubtitle={headerSubtitle}
        content={content}
        image={image}
        upvotesCount={upvotesCount}
        quotesCount={quotesCount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    backgroundColor: 'black',
    padding: 10,
  },
});

export default CommentBox;

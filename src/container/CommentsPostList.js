import React from "react";
import { View, Text, FlatList } from "react-native";
import CommentsPost from "../components/Posts/CommentsPost";

const CommentsPostList = props => {
  const renderItem = ({ item }) => {
    return <CommentsPost {...item} />;
  };

  return (
    <FlatList
      inverted={true}
      data={props.comments}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
};

export default CommentsPostList;

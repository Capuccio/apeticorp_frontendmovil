import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import Posts from "../container/Posts";
import VerticalSeparator from "../components/Posts/VerticalSeparator";
import EmptyItem from "../components/Posts/EmptyItem";

const PostsLists = props => {
  renderItem = ({ item }) => {
    return (
      <Posts
        {...item}
        likeClick={props.likeClick}
        myAccount={props.myAccount}
        navigation={props.navigation}
      />
    );
  };

  emptyItem = () => <EmptyItem navigation={props.navigation} />;

  ItemSeparatorComponent = () => <VerticalSeparator />;

  return (
    <FlatList
      data={props.postData}
      extraData={props.postData}
      ListEmptyComponent={emptyItem}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={item => item._id}
      refreshing={props.loading.refreshLoading}
      onRefresh={() => props.getNewPosts("refreshLoading", 1)}
      onEndReached={info => props.getOldPosts()}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        props.loading.footerLoading ? (
          <View style={styles.FooterComponent}>
            <ActivityIndicator size="large" color="#262121" />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  FooterComponent: {
    backgroundColor: "white",
    justifyContent: "center"
  }
});

export default PostsLists;

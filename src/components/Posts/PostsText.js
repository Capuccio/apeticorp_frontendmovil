import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PostsText = props => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}> {props.contentText} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  Text: {
    color: "black"
  }
});

export default PostsText;

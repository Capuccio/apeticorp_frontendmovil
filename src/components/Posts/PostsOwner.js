import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreatePostsInfor = props => {
  return (
    <View style={styles.NameContainer}>
      <Text style={styles.Text}> 👤 {props.userName} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  NameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "white"
  },
  Text: {
    fontWeight: "bold",
    opacity: 0.6,
    alignItems: "flex-start"
  }
});

export default CreatePostsInfor;

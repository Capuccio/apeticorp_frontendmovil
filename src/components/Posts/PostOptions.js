import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostOptions = props => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text} onPress={() => props.likeClick(props.idPost)}>
        <Ionicons name="ios-thumbs-up" size={28} color={props.likeColor} /> Me
        gusta
      </Text>
      <Text
        style={styles.Text}
        onPress={() =>
          props.navigation.navigate("CommentPost", {
            idPost: props.idPost,
            contentText: props.contentText,
            ownerDescription: props.ownerDescription
          })
        }
      >
        <Ionicons name="ios-chatbubbles" size={28} color="#691919" /> Comentar
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .15)",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  Text: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    textAlign: "center"
  }
});

export default PostOptions;

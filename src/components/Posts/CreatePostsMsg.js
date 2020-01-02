import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CreatePostsMsg = props => {
  return (
    <View>
      <TextInput
        style={styles.TextInput}
        onFocus={props.createPosts}
        placeholder="¿Que deseas publicar?"
        multiline
        numberOfLines={4}
        value={props.postText}
        onChangeText={text => props.handleText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    marginBottom: 10,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .15)",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2
  }
});

export default CreatePostsMsg;

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CreatePostsInfor = props => {
  return (
    <View style={styles.NameContainer}>
      <View style={{ marginLeft: 5 }}>
        {props.pictureProfile != null ? (
          <Image
            source={{ uri: props.pictureProfile }}
            style={{ width: 32, height: 32, borderRadius: 20 }}
          />
        ) : (
          <Text>👤</Text>
        )}
      </View>
      <Text style={styles.Text}>{props.userName} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  NameContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "white",
    alignItems: "center"
  },
  Text: {
    fontWeight: "bold",
    opacity: 0.6,
    marginLeft: 10
  }
});

export default CreatePostsInfor;

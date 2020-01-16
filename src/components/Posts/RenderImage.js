import React from "react";
import { View, Image, StyleSheet } from "react-native";

const renderUploadImage = props => {
  if (props.media.length === 0) {
    return <View style={styles.Container}></View>;
  } else {
    return (
      <View style={styles.Container}>
        <Image
          source={{
            uri: props.media
          }}
          style={styles.Image}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .15)"
  },
  Image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    backgroundColor: "transparent"
  }
});

export default renderUploadImage;

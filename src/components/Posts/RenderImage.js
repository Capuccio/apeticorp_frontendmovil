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
    alignItems: "center"
  },
  Image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    backgroundColor: "transparent"
  }
});

export default renderUploadImage;

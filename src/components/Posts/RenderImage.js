import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const renderUploadImage = props => {
  var direction;
  if (props.media.indexOf("file") > -1) {
    direction = props.media;
  } else {
    direction = `https://apeticorp-backend.herokuapp.com/${props.media}`;
  }

  if (props.media.length === 0) {
    return <View style={styles.Container}></View>;
  } else {
    return (
      <View style={styles.Container}>
        <Image
          source={{
            uri: direction
          }}
          style={styles.Image}
        />
      </View>
    );
  }
};

const dimensions = Dimensions.get("window");

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

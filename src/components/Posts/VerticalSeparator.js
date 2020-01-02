import React from "react";
import { View, Text, StyleSheet } from "react-native";

const VerticalSeparator = props => {
  return <View style={styles.Separator}></View>;
};

const styles = StyleSheet.create({
  Separator: {
    marginVertical: 8
  }
});

export default VerticalSeparator;

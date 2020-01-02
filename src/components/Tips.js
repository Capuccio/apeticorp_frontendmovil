import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tips = props => {
  return (
    <View style={styles.TipContainer}>
      <Text style={styles.TextTip}>
        {props.tipsMsg} {props.codeReferral}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TipContainer: {
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: "dashed",
    marginTop: 15,
    marginHorizontal: 10,
    borderColor: "rgba(0, 0, 0, .40)"
  },
  TextTip: {
    color: "rgba(0, 0, 0, .50)",
    marginHorizontal: 5,
    marginVertical: 10
  }
});

export default Tips;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ListEmpty = () => {
  return (
    <View style={styles.Container}>
      <Text>
        ¿Sin referidos? ¡Díles a tus conocidos que se registren y coloquen tu
        código!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: "center"
  }
});

export default ListEmpty;

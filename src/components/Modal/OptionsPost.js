import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OptionsPost = props => {
  return (
    <View style={styles.ModalContainer}>
      <View style={styles.Options}>
        <Text
          style={styles.Option}
          onPress={() => props.deletePost(props.idPost)}
        >
          Eliminar post de {props.name}{" "}
        </Text>
        <Text style={styles.Option} onPress={() => props.closeModal()}>
          Cerrar
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: "rgba(0, 0, 0, .60)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  Options: {
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: 4
  },
  Option: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .4)",
    paddingVertical: 10,
    paddingHorizontal: 60,
    textAlign: "center"
  }
});

export default OptionsPost;

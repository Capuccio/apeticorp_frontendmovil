import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const EmptyItem = props => {
  createPosts = () => {
    props.navigation.navigate("CreatePosts");
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={createPosts}>
        <View style={styles.EmptyBox}>
          <View style={styles.ArrowUp}>
            <AntDesign name="plus" size={80} color="rgba(0, 0, 0, .10)" />
          </View>
          <Text style={styles.Text}>
            No hay posts publicados, sé el primero en hacerlo
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  EmptyBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 2,
    borderColor: "rgba(0, 0, 0, .50)"
  },
  ArrowUp: {
    marginTop: 20,
    alignItems: "center"
  },
  Text: {
    marginVertical: 20,
    paddingHorizontal: 2,
    alignItems: "center",
    fontSize: 13,
    color: "rgba(0, 0, 0, .50)"
  }
});

export default EmptyItem;

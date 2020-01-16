import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import api from "../../../utils/api";

const CommentsPost = props => {
  const [UserData, setUserData] = useState({});

  useEffect(() => {
    getUser = async () => {
      let answer = await api.getUserData(props.id_user);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      } else {
        setUserData(answer.user);
      }
    };

    getUser();
  }, []);

  return (
    <View style={styles.Container}>
      <Text style={styles.UserName}>
        {" "}
        {UserData.use_name} {UserData.use_lastname}{" "}
      </Text>
      <Text> {props.comment} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 15
  },
  UserName: {
    fontWeight: "bold"
  }
});

export default CommentsPost;

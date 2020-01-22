import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
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

  if (props.status == 1) {
    return (
      <View style={styles.Container}>
        <View style={{ marginLeft: 5 }}>
          {UserData.use_picture != null ? (
            <Image
              source={{ uri: UserData.use_picture }}
              style={{ width: 32, height: 32, borderRadius: 20 }}
            />
          ) : (
            <Text>👤</Text>
          )}
        </View>
        <Text style={styles.UserName}>
          {" "}
          {UserData.use_name} {UserData.use_lastname}{" "}
        </Text>
        <Text> {props.comment} </Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 15,
    alignItems: "center"
  },
  UserName: {
    fontWeight: "bold"
  }
});

export default CommentsPost;

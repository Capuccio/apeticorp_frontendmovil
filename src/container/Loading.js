import React, { useEffect } from "react";
import {
  View,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import Api from "../../utils/api";

const Loading = props => {
  useEffect(() => {
    const checkingLocalStorage = async () => {
      try {
        let userData = await AsyncStorage.getItem("user_data");
        console.log(userData);

        if (userData) {
          await AsyncStorage.removeItem("user_data");
          let userDataJson = JSON.parse(userData);

          let answer = await Api.getUserData(userDataJson.id_users);

          if (answer.error) {
            Alert.alert(answer.title, answer.msg);
            props.navigation.navigate("Login");
          } else {
            if (answer.user.use_status == 1) {
              await AsyncStorage.setItem(
                "user_data",
                JSON.stringify(answer.user)
              );
              props.navigation.navigate("App");
            } else {
              props.navigation.navigate("Login");
            }
          }
        } else {
          props.navigation.navigate("Login");
        }
      } catch (error) {
        console.log("Error to load AsyncStorage data ", error);
      }
    };

    checkingLocalStorage();
  });

  return (
    <View style={styles.Container}>
      <ActivityIndicator size="large" color="#262121" />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Loading;

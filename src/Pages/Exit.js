import React, { useEffect } from "react";
import {
  View,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  Alert
} from "react-native";

const Exit = props => {
  useEffect(() => {
    deleteLocalData = async () => {
      try {
        await AsyncStorage.removeItem("user_data");
        props.navigation.navigate("Loading");
      } catch (error) {
        console.log("Error delete local data: ", error);
        Alert.alert("Error Exit", "Error al cerrar sesión");
        props.navigation.navigate("Home");
      }
    };

    deleteLocalData();
  }, []);

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

export default Exit;

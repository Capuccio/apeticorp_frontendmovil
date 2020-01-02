import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  AsyncStorage,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const HeaderHome = props => {
  const [UserData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        let user = await AsyncStorage.getItem("user_data");
        setUserData(JSON.parse(user));
      } catch (error) {
        console.log(`Hubo un error al obtener los datos: ${error}`);
        Alert.alert("Hubo un error");
      }
    };

    getUserData();
  }, []);

  return (
    <SafeAreaView style={styles.ContainerTextPosts}>
      <Text style={styles.NumbeRefe}>{UserData.use_numberefe}/50</Text>
      <Text style={styles.TextPosts} onPress={createPosts}>
        ¿Que desear publicar?
      </Text>
      <TouchableOpacity onPress={notificationsPage}>
        <MaterialIcons name="notifications" size={28} color="red" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ContainerTextPosts: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, .15)",
    alignItems: "center"
  },
  TextPosts: {
    borderWidth: 1,
    padding: 10,
    width: "70%",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, .20)",
    color: "rgba(0, 0, 0, .70)"
  },
  NumbeRefe: {
    paddingRight: 10
  }
});

export default HeaderHome;

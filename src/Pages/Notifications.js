import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  AsyncStorage,
  Alert,
  StyleSheet
} from "react-native";
import Tips from "../components/Tips";
import Api from "../../utils/api";

const Notifications = () => {
  const [Notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications = async () => {
      let user = await AsyncStorage.getItem("user_data");
      let userJson = JSON.parse(user);

      let answer = await Api.getNotifications(userJson.id_users);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      } else {
        setNotifications(answer.notifications);
        let updated = await Api.updateNotifications(userJson.id_users);

        if (updated.error) {
          Alert.alert(updated.title, updated.msg);
        }
      }

      return;
    };

    getNotifications();

    return () => {
      setNotifications();
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.Container}>
        <Text style={styles.Text}> {item.not_message} </Text>
      </View>
    );
  };

  return (
    <View>
      <Tips tipsMsg="Aquí podrás ver los mensajes de los administradores" />

      <FlatList
        data={Notifications}
        keyExtractor={item => item.id_notifications.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

Notifications.navigationOptions = {
  title: "Notificaciones"
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0.7,
    marginTop: 15,
    borderRadius: 4,
    marginHorizontal: 10,
    borderColor: "rgba(0, 0, 0, .60)"
  },
  Text: {
    padding: 10
  }
});

export default Notifications;

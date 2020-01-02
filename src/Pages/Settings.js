import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage, StyleSheet, Alert } from "react-native";
import SettingsForm from "../components/Settings/SettingsForm";
import Api from "../../utils/api";
import Tips from "../components/Tips";
const REGULAR_EXPRESION_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Settings = props => {
  const [UserData, setUserData] = useState({});

  useEffect(() => {
    getLocalData = async () => {
      let userLocalData = await AsyncStorage.getItem("user_data");
      let dataJson = JSON.parse(userLocalData);
      dataJson.use_password = "";
      dataJson.use_mobile = "";
      setUserData(dataJson);
    };

    getLocalData();
    props.navigation.addListener("willFocus", payload => {
      getLocalData();
    });
  }, []);

  handleText = (inputKey, inputValue) => {
    setUserData({
      ...UserData,
      [inputKey]: inputValue
    });
  };

  sendNewData = async () => {
    if (
      !UserData.use_email.trim() ||
      !UserData.use_name.trim() ||
      !UserData.use_lastname.trim()
    ) {
      Alert(
        "Campos vacíos",
        "El nombre, apellido y correo no pueden estar vacíos"
      );
    } else if (!REGULAR_EXPRESION_EMAIL.test(UserData.use_email.trim())) {
      Alert.alert("Correo", "Debe introducir una dirección de correo válido");
    } else if (UserData.use_mobile.trim() && UserData.use_mobile.length < 10) {
      Alert.alert(
        "Celular",
        "El número de celular no puede ser menos de 10 dígitos"
      );
    } else {
      const answer = await Api.updateUser(UserData);
      Alert.alert(answer.title, answer.msg);

      if (!answer.error) {
        try {
          await AsyncStorage.removeItem("user_data");
          await AsyncStorage.setItem("user_data", JSON.stringify(UserData));
        } catch (error) {
          Alert.alert(
            "Error Local",
            "Hubo un error al tratar de actualizar los datos en caché"
          );
          console.log(error);
        }
      }
    }
  };

  return (
    <View style={styles.Container}>
      <Tips
        tipsMsg="Si no deseas cambiar tu clave o tu número de celular, dejar sus campos
        vacíos"
      />

      <SettingsForm
        user={UserData}
        handleText={handleText}
        sendNewData={sendNewData}
      />
    </View>
  );
};

Settings.navigationOptions = {
  title: "Configuraciones"
};

const styles = StyleSheet.create({
  Container: {
    flex: 1
  }
});

export default Settings;

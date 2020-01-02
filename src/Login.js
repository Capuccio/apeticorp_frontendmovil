import React, { useState } from "react";
import { Alert, StyleSheet, AsyncStorage } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../utils/api";
import LoginForm from "./components/LogReg/LoginForm";

const Login = props => {
  const [Login, setLogin] = useState({
    form: {
      email: "",
      pass: ""
    }
  });

  handleChange = (inputKey, inputValue) => {
    setLogin({
      form: {
        ...Login.form,
        [inputKey]: inputValue
      }
    });
  };

  handleLogin = async () => {
    if (Login.form.email.trim() == "" || Login.form.pass.trim() == "") {
      Alert.alert("Debe rellenar todos los campos");
    } else {
      const loginAnswer = await api.userLogin(Login.form);

      if (loginAnswer.error) {
        Alert.alert(loginAnswer.msg);
      } else {
        try {
          await AsyncStorage.setItem(
            "user_data",
            JSON.stringify(loginAnswer.msg)
          );

          props.navigation.navigate("Loading");
        } catch (error) {
          console.log("Error al Guardar: ", error);
        }
      }
    }
  };

  return (
    <LinearGradient style={styles.Container} colors={["#691919", "#262121"]}>
      <LoginForm
        changeText={handleChange}
        state={Login.form}
        handleLogin={handleLogin}
        navigation={props.navigation}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Login;

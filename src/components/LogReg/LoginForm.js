import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import LogRegLayout from "./LogRegLayout";

const LoginForm = props => {
  return (
    <View style={styles.Login}>
      <Text style={styles.Title}>APETICORP</Text>
      <Text style={styles.Text}>Correo:</Text>
      <TextInput
        style={styles.Input}
        onChangeText={email => props.changeText("email", email)}
        value={props.state.email}
      />
      <Text style={styles.Text}>Clave:</Text>
      <TextInput
        style={styles.Input}
        onChangeText={password => props.changeText("pass", password)}
        value={props.state.pass}
        secureTextEntry
      />

      <LogRegLayout />

      <View style={styles.Button}>
        <Button color="#d14141" title="Iniciar" onPress={props.handleLogin} />
      </View>
      <View style={styles.Button}>
        <Button
          color="#d14141"
          title="Registrarse"
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Login: {
    height: "33%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25%"
  },
  Title: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold"
  },
  Text: {
    color: "white"
  },
  Input: {
    height: 34,
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    color: "black",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    opacity: 0.85,
    fontSize: 16
  },
  Button: {
    width: "88%",
    marginTop: 13
  }
});

export default LoginForm;

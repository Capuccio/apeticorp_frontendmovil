import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const SettingsForm = props => {
  return (
    <View>
      <TextInput
        placeholder="Name"
        style={styles.TextInput}
        value={props.user.use_name}
        onChangeText={name => props.handleText("use_name", name)}
      />

      <TextInput
        placeholder="Apellido"
        style={styles.TextInput}
        value={props.user.use_lastname}
        onChangeText={lastname => props.handleText("use_lastname", lastname)}
      />

      <TextInput
        placeholder="Correo"
        style={styles.TextInput}
        value={props.user.use_email}
        onChangeText={email => props.handleText("use_email", email)}
      />

      <TextInput
        placeholder="Clave"
        style={styles.TextInput}
        secureTextEntry
        onChangeText={password => props.handleText("use_password", password)}
      />

      <TextInput
        placeholder="Celular"
        style={styles.TextInput}
        keyboardType="phone-pad"
        onChangeText={mobile => props.handleText("use_mobile", mobile)}
        maxLength={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 1,
    marginVertical: 20,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, .20)"
  }
});

export default SettingsForm;

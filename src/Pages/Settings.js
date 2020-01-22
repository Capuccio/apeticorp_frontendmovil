import React, { useState, useEffect } from "react";
import {
  View,
  AsyncStorage,
  StyleSheet,
  Alert,
  Button,
  ScrollView
} from "react-native";
import SettingsForm from "../components/Settings/SettingsForm";
import Api from "../../utils/api";
import Tips from "../components/Tips";
import * as ImagePicker from "expo-image-picker";
import RenderImage from "../components/Posts/RenderImage";
const REGULAR_EXPRESION_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Settings = props => {
  const [UserData, setUserData] = useState({
    fileRoute: "",
    media: "",
    use_password: "",
    use_mobile: ""
  });
  const [Buttons, setButtons] = useState({
    disabled: false,
    uploadImage: "Subir imagen",
    takePhoto: "Tomar foto",
    sendPost: "Publicar post"
  });

  useEffect(() => {
    getLocalData = async () => {
      let userLocalData = await AsyncStorage.getItem("user_data");
      let dataJson = JSON.parse(userLocalData);
      setUserData(User => {
        return {
          ...User,
          ...dataJson
        };
      });
    };

    getLocalData();
    props.navigation.addListener("willFocus", payload => {
      getLocalData();
    });
  }, []);

  handleMedia = async image => {
    setUserData({
      ...UserData,
      fileRoute: image.uri,
      media: image.base64
    });
  };

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
    }
  };

  takePhoto = async () => {
    setButtons({
      ...Buttons,
      disabled: true,
      takePhoto: "Tomando foto"
    });

    let photo = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1000, 1400],
      quality: 1,
      base64: true
    });

    setButtons({
      ...Buttons,
      disabled: false,
      takePhoto: "Tomar foto"
    });

    if (!photo.cancelled) {
      handleMedia(photo);
    }
  };

  uploadImage = async () => {
    setButtons({
      ...Buttons,
      disabled: true,
      uploadImage: "Cargando imagen..."
    });

    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Media,
      allowsEditing: true,
      aspect: [1080, 1080],
      quality: 1,
      base64: true
    });

    setButtons({
      ...Buttons,
      disabled: false,
      uploadImage: "Subir imagen"
    });

    if (!image.cancelled) {
      handleMedia(image);
    }
  };

  return (
    <View style={styles.Container}>
      <Tips
        tipsMsg="Si no deseas cambiar tu clave o tu número de celular, dejar sus campos
        vacíos"
      />

      <ScrollView>
        <SettingsForm user={UserData} handleText={handleText} />
        <RenderImage media={UserData.fileRoute} />

        <Button
          title={Buttons.uploadImage}
          onPress={uploadImage}
          disabled={Buttons.disabled}
        />
        <Button title={Buttons.takePhoto} onPress={takePhoto} />
      </ScrollView>

      <Button title="Guardar" onPress={sendNewData} />
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

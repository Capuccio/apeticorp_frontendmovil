import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  Alert,
  ScrollView
} from "react-native";
import PostsOwner from "../components/Posts/PostsOwner";
import CreatePostsMsg from "../components/Posts/CreatePostsMsg";
import Api from "../../utils/api";
import * as ImagePicker from "expo-image-picker";
import RenderImage from "../components/Posts/RenderImage";

const CreatePostsLayout = props => {
  const [Buttons, setButtons] = useState({
    disabled: false,
    uploadImage: "Subir imagen",
    takePhoto: "Tomar foto",
    sendPost: "Publicar post"
  });

  const [Post, setPost] = useState({
    id_user: "",
    userName: "",
    postText: "",
    fileRoute: "",
    name: "",
    type: "",
    media: ""
  });

  useEffect(() => {
    getData = async () => {
      try {
        let userStorage = await AsyncStorage.getItem("user_data");
        let userData = JSON.parse(userStorage);

        setPost({
          ...Post,
          id_user: userData.id_users,
          userName: `${userData.use_name} ${userData.use_lastname}`
        });
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  handleText = text => {
    setPost({
      ...Post,
      postText: text
    });
  };

  handleMedia = async image => {
    let mediaNameFormat = image.uri.split("/").pop();
    let changeFormat = mediaNameFormat.split(".");
    changeFormat.pop();
    changeFormat.push("jpg");
    let mediaName = changeFormat.join(".");

    setPost({
      ...Post,
      fileRoute: image.uri,
      name: mediaName,
      type: image.type,
      media: image.base64
    });
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

  submitPost = async () => {
    if (!Post.media) {
      Alert.alert(
        "Imagen",
        "Debe seleccionar una imagen o tomar una foto para publicar"
      );
    } else {
      setButtons({
        ...Buttons,
        disabled: true,
        sendPost: "Subiendo imagen"
      });

      let answer = await Api.createPosts(Post);

      setButtons({
        ...Buttons,
        disabled: false,
        sendPost: "Publicar post"
      });

      let title = answer.error ? "Error" : "Imagen subida";

      Alert.alert(title, answer.msg);
    }
  };

  return (
    <View style={styles.Container}>
      <PostsOwner userName={Post.userName} />
      <CreatePostsMsg handleText={handleText} />
      <RenderImage media={Post.fileRoute} />

      <Button
        title={Buttons.uploadImage}
        onPress={uploadImage}
        disabled={Buttons.disabled}
      />
      <Button
        title={Buttons.takePhoto}
        onPress={takePhoto}
        disabled={Buttons.disabled}
      />
      <Button
        title={Buttons.sendPost}
        onPress={submitPost}
        disabled={Buttons.disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 5,
    paddingTop: 10
  }
});

export default CreatePostsLayout;

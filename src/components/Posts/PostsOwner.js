import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import OptionsPost from "../Modal/OptionsPost";
import api from "../../../utils/api";

const CreatePostsInfor = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const deletePost = async idPost => {
    Alert.alert(
      "¿Desea eliminar el Post?",
      "Una vez eliminado este Post no se podrá recuperar ni la imágen ni los datos",
      [
        {
          text: "Cancelar"
        },
        {
          text: "Ok",
          onPress: async () => {
            const answer = await api.deletePost({ idPost });
            Alert.alert(answer.title, answer.msg);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.NameContainer}>
      <View style={styles.ProfilePicture}>
        {props.pictureProfile != null ? (
          <Image
            source={{ uri: props.pictureProfile }}
            style={{ width: 32, height: 32, borderRadius: 20 }}
          />
        ) : (
          <Text>👤</Text>
        )}
      </View>
      <Text style={styles.Text}> {props.userName} </Text>

      {props.level == 2 && (
        <TouchableOpacity
          style={styles.Options}
          onPress={() => setModalVisible(true)}
        >
          <SimpleLineIcons name="options-vertical" size={16} />
        </TouchableOpacity>
      )}

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <OptionsPost
          deletePost={deletePost}
          closeModal={closeModal}
          name={props.userName}
          idPost={props.idPost}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  NameContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "white",
    alignItems: "center"
  },
  ProfilePicture: {
    marginLeft: 5
  },
  Text: {
    fontWeight: "bold",
    opacity: 0.6,
    marginLeft: 8
  },
  Options: {
    position: "absolute",
    right: 17,
    padding: 5
  }
});

export default CreatePostsInfor;

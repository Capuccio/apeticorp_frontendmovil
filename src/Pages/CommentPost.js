import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  AsyncStorage
} from "react-native";
import api from "../../utils/api";
import CommentsPostList from "../container/CommentsPostList";

const CommentPost = props => {
  const { navigation } = props;

  const [Loading, setLoading] = useState(true);
  const [Comments, setComments] = useState([]);
  const [UserData, setUserData] = useState({});
  const [Comment, setComment] = useState({
    comment: "",
    idPost: navigation.getParam("idPost", "Nada"),
    idUser: ""
  });

  useEffect(() => {
    const getCommentsData = async () => {
      const answer = await api.getPostComments(
        navigation.getParam("idPost", "Nada")
      );

      if (answer.error) {
        Alert.alert("Error Consulta", answer.msg);
      }

      let userLocalData = await AsyncStorage.getItem("user_data");
      setUserData(JSON.parse(userLocalData));
      setComments(answer.postcomments.comments);
      setLoading(false);
    };

    getCommentsData();
  }, []);

  handleComment = async text => {
    if (Comment.comment.length < 200 || Comment.comment.length > text.length) {
      setComment({
        ...Comment,
        comment: text,
        idUser: UserData.id_users
      });
    }
  };

  postComment = async () => {
    if (Comment.comment.length > 0) {
      let validateComment = Comments.map(element => {
        return element.id_user;
      }).indexOf(UserData.id_users);

      if (validateComment == -1) {
        const answer = await api.commentPost(Comment);

        if (answer.error) {
          Alert.alert(answer.msg);
        } else {
          const updateComments = await api.getPostComments(
            navigation.getParam("idPost", "Nada")
          );

          setComments(updateComments.postcomments.comments);
        }
      } else {
        Alert.alert("Solo está permitido un comentario por Post");
      }
    }
  };

  if (Loading) {
    return (
      <View style={styles.Container}>
        <ActivityIndicator size="large" color="#262121" />
      </View>
    );
  } else {
    return (
      <View>
        {navigation.getParam("contentText", "nada").length > 0 && (
          <View style={styles.Description}>
            <Text style={styles.DescriptionOwner}>
              {" "}
              {navigation.getParam("ownerDescription")}{" "}
            </Text>
            <Text style={styles.DescriptionText}>
              {" "}
              {navigation.getParam("contentText")}{" "}
            </Text>
          </View>
        )}
        <View style={styles.CreateComment}>
          <View style={styles.Comment}>
            <TextInput
              placeholder="Escribir comentario"
              onChangeText={handleComment}
              value={Comment.comment}
            />
          </View>
          <View style={styles.Button}>
            <Button title="Publicar" onPress={postComment} />
          </View>
        </View>
        <CommentsPostList comments={Comments} />
      </View>
    );
  }
};

CommentPost.navigationOptions = {
  title: "Comentarios"
};

const styles = StyleSheet.create({
  Description: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, .15)"
  },
  DescriptionOwner: {
    fontWeight: "bold"
  },
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  CreateComment: {
    marginHorizontal: 5,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  Comment: {
    width: "56%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, .30)",
    overflow: "hidden",
    justifyContent: "flex-start"
  },
  Button: {
    width: "40%",
    justifyContent: "flex-end"
  }
});

export default CommentPost;

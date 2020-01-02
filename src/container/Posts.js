import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import PostsOwner from "../components/Posts/PostsOwner";
import Api from "../../utils/api";
import PostsText from "../components/Posts/PostsText";
import RenderImage from "../components/Posts/RenderImage";
import PostOptions from "../components/Posts/PostOptions";

const Posts = props => {
  const [UserData, setUserData] = useState({});
  var likeColor;
  // const Image64 = "data:image/jpg;base64," + props.contentMedia;

  useEffect(() => {
    getUserData = async () => {
      let answer = await Api.getUserData(props.id_user);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      } else {
        setUserData(answer.user);
      }
    };

    getUserData();
  }, []);

  if (props.likesNumber.indexOf(props.myAccount.id_users) > -1) {
    likeColor = "#bf2626";
  } else {
    likeColor = "#691919";
  }

  return (
    <View style={styles.Card}>
      <PostsOwner userName={`${UserData.use_name} ${UserData.use_lastname}`} />
      <RenderImage media={props.contentMedia} />
      <PostsText contentText={props.contentText} />
      <Text style={styles.LikesText}> {props.likesNumber.length} Me gusta</Text>
      <PostOptions
        idPost={props._id}
        likeClick={props.likeClick}
        likeColor={likeColor}
        navigation={props.navigation}
        contentText={props.contentText}
        ownerDescription={`${UserData.use_name} ${UserData.use_lastname}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "white"
  },
  LikesText: {
    color: "rgba(0, 0, 0, .60)"
  }
});

export default Posts;
